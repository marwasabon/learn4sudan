import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import programsApi from "../api/programsApi.js";
import applicationsApi from "../api/applicationsApi.js";
import {
  parseMrzFromLines,
  fallbackExtract,
  extractNationalNumber,
} from "../utils/ocrExtract.js";
import ProgramInfo from "../components/apply/ProgramInfo";
import ApplyForm from "../components/apply/ApplyForm";
import "../components/apply/apply.css";

export default function ApplyPage() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const [school, setSchool] = useState("");
  const [fullName, setFullName] = useState("");
  const [reason, setReason] = useState("");
  const [fileName, setFileName] = useState("");
  const [extractedDob, setExtractedDob] = useState("");
  const [extractedIdNumber, setExtractedIdNumber] = useState("");
  const [extracting, setExtracting] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const items = await programsApi.getPrograms();
        const found = (items || []).find((p) => (p._id || p.id) === programId);
        if (mounted) setProgram(found || null);
      } catch (e) {}
    };
    load();
    return () => {
      mounted = false;
    };
  }, [programId]);

  const extractFromImage = async () => {
    setError("");
    setOk(false);
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select an ID image first.");
      return;
    }
    setExtracting(true);
    try {
      const { data } = await Tesseract.recognize(file, "eng", {
        logger: () => {},
      });
      const text = (data?.text || "").replace(/\r/g, "");
      const lines = text
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean);

      const mrz = parseMrzFromLines(lines);
      if (mrz) {
        if (mrz.dob) setExtractedDob(mrz.dob);
        const nn = extractNationalNumber(text, lines);
        if (nn) setExtractedIdNumber(nn);
        else if (mrz.docNumber) setExtractedIdNumber(mrz.docNumber);
        if (mrz.fullName) setFullName(mrz.fullName);
      } else {
        const fb = fallbackExtract(text, lines);
        if (fb.dob) setExtractedDob(fb.dob);
        const nn = extractNationalNumber(text, lines);
        if (nn) setExtractedIdNumber(nn);
        else if (fb.docNumber) setExtractedIdNumber(fb.docNumber);
        if (fb.fullName) setFullName(fb.fullName);
        if (!fb.dob && !fb.docNumber) {
          setError("Could not  extract fields. Try a clearer image.");
        }
      }
    } catch (e) {
      setError(e.message || "Failed to run OCR");
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setOk(false);
    try {
      const file = fileInputRef.current?.files?.[0] || null;
      await applicationsApi.submitApplication({
        programId,
        reason,
        school,
        full_name: fullName,
        date_of_birth: extractedDob,
        national_id_number: extractedIdNumber,
        file,
      });
      setOk(true);
      setReason("");
      setSchool("");
      setFullName("");
      setExtractedDob("");
      setExtractedIdNumber("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      // navigate("/applications");
    } catch (e) {
      setError(e.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="apply-header">
              <h1 className="h3 apply-title text-success">
                {program?.name ? `Apply to ${program.name}` : "Apply"}
              </h1>
              {program?.status && (
                <span className="badge text-bg-secondary">
                  {program.status}
                </span>
              )}
            </div>

            <ProgramInfo program={program} />
            <ApplyForm
              fullName={fullName}
              setFullName={setFullName}
              school={school}
              setSchool={setSchool}
              fileName={fileName}
              setFileName={setFileName}
              extractedDob={extractedDob}
              setExtractedDob={setExtractedDob}
              extractedIdNumber={extractedIdNumber}
              setExtractedIdNumber={setExtractedIdNumber}
              reason={reason}
              setReason={setReason}
              submitting={submitting}
              extracting={extracting}
              error={error}
              ok={ok}
              onExtract={extractFromImage}
              onSubmit={handleSubmit}
              fileInputRef={fileInputRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
