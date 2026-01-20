const BASE_URL = "http://localhost:3000/api/courses";

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

export async function getCourses() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  return handleResponse(res);
}

export async function createCourse(payload) {
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

export async function updateCourse(id, payload) {
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

export async function deleteCourse(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  return handleResponse(res);
}

export default { getCourses, createCourse, updateCourse, deleteCourse };
