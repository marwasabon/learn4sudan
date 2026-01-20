const BASE_URL = "http://localhost:3000/api/programs";
export const API_ORIGIN = new URL(BASE_URL).origin;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export async function getPrograms() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  return handleResponse(res);
}

export async function createProgram(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return handleResponse(res);
}

export async function updateProgram(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return handleResponse(res);
}

export async function createProgramWithImage(fields, file) {
  const form = new FormData();
  Object.entries(fields || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      if (Array.isArray(v)) form.append(k, JSON.stringify(v));
      else form.append(k, String(v));
    }
  });
  if (file) form.append("image", file);
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: form,
    credentials: "include",
  });
  return handleResponse(res);
}

export async function updateProgramImage(id, file) {
  const form = new FormData();
  if (file) form.append("image", file);
  const res = await fetch(`${BASE_URL}/${id}/image`, {
    method: "POST",
    body: form,
    credentials: "include",
  });
  return handleResponse(res);
}

export async function deleteProgram(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  return handleResponse(res);
}

export default {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  createProgramWithImage,
  updateProgramImage,
};
