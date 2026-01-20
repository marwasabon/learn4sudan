const raw = import.meta.env.VITE_API_BASE_URL || "/api";
export const API_BASE_URL =
  typeof raw === "string" ? raw.replace(/\/$/, "") : "/api";

export default { API_BASE_URL };
