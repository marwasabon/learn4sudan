
const RAW_BASE = import.meta.env.VITE_API_BASE || "";

function joinUrl(base, path) {
  const b = String(base || "").replace(/\/$/, "");
  const p = String(path || "").replace(/^\//, "");
  return b ? `${b}/${p}` : `/${p}`;
}

function readToken() {
  try {
    return localStorage.getItem("auth_token") || null;
  } catch {
    return null;
  }
}

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  const jwt = token ?? readToken();
  if (jwt) headers.Authorization = `Bearer ${jwt}`;
  const url = joinUrl(RAW_BASE, path);
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }
  return data;
}

export async function login(email, password) {
  return request("api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function register(payload) {
  // payload: { email, password, first_name?, last_name? }
  return request("api/auth/register", { method: "POST", body: payload });
}

export function setToken(token) {
  localStorage.setItem("auth_token", token);
}

export function getToken() {
  return localStorage.getItem("auth_token");
}

export function clearToken() {
  localStorage.removeItem("auth_token");
}

export async function get(path) {
  return request(path, { method: "GET" });
}

export async function post(path, body) {
  return request(path, { method: "POST", body });
}
