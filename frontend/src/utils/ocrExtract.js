//  OCR helpers using Tesseract output

function cleanName(name) {
  if (!name) return "";
  // Allow letters, spaces, apostrophes, hyphens; collapse repeats; trim
  return name
    .replace(/[^A-Za-z\s'\-]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\-+/g, "-")
    .trim();
}
// fun ti 
function normalizeMrzLine(line) {
  if (!line) return "";
  return line
    .replace(/[|]/g, "<") // common OCR artifact
    .replace(/\s+/g, "")
    .toUpperCase()
    .trim();
}

function fixOcrDigits(s) {
  if (!s) return "";
  // Replace likely OCR confusions in numeric fields
  return s.replace(/O/g, "0").replace(/I/g, "1");
}

function yyMMddToIso(s) {
  if (!/^\d{6}$/.test(s)) return "";
  const yy = parseInt(s.slice(0, 2), 10);
  const mm = s.slice(2, 4);
  const dd = s.slice(4, 6);
  const year = yy >= 70 ? 1900 + yy : 2000 + yy; // heuristic
  return `${year}-${mm}-${dd}`;
}

export function parseMrzFromLines(lines) {
  const mrzCandidates = lines
    .map((l) => normalizeMrzLine(l))
    .filter((l) => /^[A-Z0-9<]{25,}$/.test(l));
  if (mrzCandidates.length < 2) return null;

  // Prefer the last 3 or last 2 candidates depending on format
  const last3 = mrzCandidates.slice(-3);
  const last2 = mrzCandidates.slice(-2);

  // TD1 ID card: 3 lines, ~30 chars each
  if (
    last3.length === 3 &&
    last3.every((l) => l.length >= 28 && l.length <= 31)
  ) {
    const [l1, l2, l3] = last3;
    const docNumber = fixOcrDigits(l2.slice(0, 9)).replace(/</g, "").trim();
    const nationality = l2.slice(10, 13).replace(/</g, "").trim();
    const dobYYMMDD = fixOcrDigits(l2.slice(13, 19));
    const sex = l2.slice(20, 21);
    const expiryYYMMDD = fixOcrDigits(l2.slice(21, 27));

    const dob = yyMMddToIso(dobYYMMDD);
    const expiry = yyMMddToIso(expiryYYMMDD);

    // Names are usually on line 3 in SURNAME<<GIVEN format
    let surname = "";
    let givenNames = "";
    const parts = l3.split("<<");
    if (parts.length >= 2) {
      surname = cleanName(parts[0].replace(/</g, " "));
      givenNames = cleanName(parts[1].replace(/</g, " "));
    }
    const fullName = cleanName([givenNames, surname].filter(Boolean).join(" "));

    return {
      docNumber,
      dob,
      expiry,
      sex: sex === "F" ? "F" : sex === "M" ? "M" : undefined,
      nationality,
      surname: surname || undefined,
      givenNames: givenNames || undefined,
      fullName,
    };
  }

  // TD3 Passport: 2 lines, 44 chars each
  if (
    last2.length === 2 &&
    last2.every((l) => l.length >= 42 && l.length <= 46)
  ) {
    const l1 = last2[0];
    const l2 = last2[1];
    const docNumber = fixOcrDigits(l2.slice(0, 9)).replace(/</g, "").trim();
    const nationality = l2.slice(10, 13).replace(/</g, "").trim();
    const dobYYMMDD = fixOcrDigits(l2.slice(13, 19));
    const sex = l2.slice(20, 21);
    const expiryYYMMDD = fixOcrDigits(l2.slice(21, 27));

    const dob = yyMMddToIso(dobYYMMDD);
    const expiry = yyMMddToIso(expiryYYMMDD);

    // Names: after 'P<' + issuing country (3), names in SURNAME<<GIVEN format
    let surname = "";
    let givenNames = "";
    const nameField = l1.slice(5); // skip 'P<' + country
    const parts = nameField.split("<<");
    if (parts.length >= 2) {
      surname = cleanName(parts[0].replace(/</g, " "));
      givenNames = cleanName(parts[1].replace(/</g, " "));
    }
    const fullName = cleanName([givenNames, surname].filter(Boolean).join(" "));

    return {
      docNumber,
      dob,
      expiry,
      sex: sex === "F" ? "F" : sex === "M" ? "M" : undefined,
      nationality,
      surname: surname || undefined,
      givenNames: givenNames || undefined,
      fullName,
    };
  }

  return null;
}

export function fallbackExtract(text, lines) {
  const dob =
    (text.match(/\b(\d{2}[\/-]\d{2}[\/-]\d{4})\b/) || [])[1] ||
    (text.match(/\b(\d{4}[\/-]\d{2}[\/-]\d{2})\b/) || [])[1] ||
    "";

  const docNumber =
    (text.match(
      /\b(?:passport|document|national|no\.?|number)[^\w]*([A-Z0-9-]{6,})\b/i
    ) || [])[1] ||
    (text.match(/[A-Z0-9]{8,}/g) || []).find(
      (t) => /[A-Z]/.test(t) || t.length >= 9
    ) ||
    "";

  const nameLine = lines.find(
    (l) =>
      /^[A-Z][A-Z\s'’-]{5,}$/i.test(l) &&
      !/(passport|document|identity|date|birth|national|expiry)/i.test(l)
  );

  return {
    docNumber: (docNumber || "").trim(),
    dob: (dob || "").trim(),
    fullName: cleanName((nameLine || "").trim()),
  };
}

// Normalize number-like strings (ASCII only)
function normalizeNumberLike(input) {
  if (!input) return "";
  const unified = input
    .replace(/[—–−‐]/g, "-")
    .replace(/\s+/g, "")
    .replace(/[^0-9A-Za-z-]/g, "");
  return unified
    .replace(/[OoDd]/g, "0")
    .replace(/[Il|]/g, "1")
    .replace(/B/g, "8");
}

// Extract the printed National Number from text/lines when available
export function extractNationalNumber(text, lines) {
  const haystack = (text || "").replace(/\r/g, " ");
  const labelRegex = /(national\s*(?:no\.?|number))/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || "";
    if (labelRegex.test(line)) {
      const same = line.match(/(\d[\d\s—–−\-]{8,}\d)/);
      if (same) return normalizeNumberLike(same[1]);
      for (let j = 1; j <= 2 && i + j < lines.length; j++) {
        const nxt = lines[i + j] || "";
        const m = nxt.match(/(\d[\d\s—–−\-]{8,}\d)/);
        if (m) return normalizeNumberLike(m[1]);
      }
    }
  }

  const global = haystack.match(/(\d[\d\s—–−\-]{8,}\d)/);
  if (global) {
    const candidate = normalizeNumberLike(global[1]);
    const digits = candidate.replace(/[^0-9]/g, "");
    if (digits.length >= 10) return candidate;
  }
  return "";
}
