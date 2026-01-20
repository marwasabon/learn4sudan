import { getToken } from "./auth.js";
import { API_BASE_URL } from "./config.js";
const BASE_URL = `${API_BASE_URL}/applications`;

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

export async function getApplications() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  return handleResponse(res);
}

export async function deleteApplication(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  return handleResponse(res);
}

export async function updateApplication(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload || {}),
    credentials: "include",
  });
  return handleResponse(res);
}

export async function submitApplication({
  programId,
  reason,
  school,
  full_name,
  date_of_birth,
  national_id_number,
  file,
}) {
  const form = new FormData();
  form.set("programId", programId);
  form.set("reason", reason);
  if (school) form.set("school", school);
  if (full_name) form.set("full_name", full_name);
  if (date_of_birth) form.set("date_of_birth", date_of_birth);
  if (national_id_number) form.set("national_id_number", national_id_number);
  if (file) form.set("nationalId", file);

  const token = getToken();
  const res = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  return handleResponse(res);
}

export default {
  getApplications,
  deleteApplication,
  submitApplication,
  updateApplication,
};
