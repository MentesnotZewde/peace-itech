// Browser-side wrapper around the /api routes: keeps the JWT in one place,
// attaches it to every request, and turns error responses into thrown
// ApiErrors so callers can just try/catch.

const TOKEN_KEY = "peace-itech.token";
const USER_KEY = "peace-itech.user";

export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    // Per-field messages from a 422, e.g. { email: "A valid email is required" }
    this.fields = fields || null;
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveSession({ token, user }) {
  window.localStorage.setItem(TOKEN_KEY, token);
  saveUser(user);
}

export function saveUser(user) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = {};
  const token = auth ? getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  // FormData sets its own multipart boundary — never set Content-Type for it.
  let payload = body;
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(path, { method, headers, body: payload });
  } catch {
    throw new ApiError("Cannot reach the server. Check your connection.", 0);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // An expired or revoked token is worthless — drop it so the app can
    // send the user back to the login page.
    if (response.status === 401 && auth) clearSession();
    throw new ApiError(data.error || "Something went wrong", response.status, data.fields);
  }

  return data;
}

/**
 * Builds a FormData body, sending only the fields the caller actually set.
 * File values are appended as-is so Cloudinary uploads work.
 */
export function toFormData(values) {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null || value === "") continue;
    form.append(key, value);
  }
  return form;
}

export const auth = {
  login: (email, password) =>
    apiFetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    }),
  me: () => apiFetch("/api/auth/me"),
  // The session cookie is httpOnly, so only the server can clear it.
  logout: () =>
    apiFetch("/api/auth/logout", { method: "POST", auth: false }).catch(
      () => null,
    ),
};

export const projectsApi = {
  list: () => apiFetch("/api/projects"),
  create: (body) => apiFetch("/api/projects", { method: "POST", body }),
  update: (id, body) =>
    apiFetch(`/api/projects/${id}`, { method: "PATCH", body }),
  remove: (id) => apiFetch(`/api/projects/${id}`, { method: "DELETE" }),
};

export const mediaApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== "" && v != null),
    ).toString();
    return apiFetch(`/api/media${query ? `?${query}` : ""}`);
  },
  create: (body) => apiFetch("/api/media", { method: "POST", body }),
  update: (id, body) => apiFetch(`/api/media/${id}`, { method: "PATCH", body }),
  remove: (id) => apiFetch(`/api/media/${id}`, { method: "DELETE" }),
};

export const appointmentsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== "" && v != null),
    ).toString();
    return apiFetch(`/api/appointments${query ? `?${query}` : ""}`);
  },
  // Only the status is editable; rescheduling would have to rewrite the
  // calendar event, so it is not exposed here.
  setStatus: (id, status) =>
    apiFetch(`/api/appointments/${id}`, {
      method: "PATCH",
      body: { status },
    }),
  remove: (id) => apiFetch(`/api/appointments/${id}`, { method: "DELETE" }),
};

export const usersApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== "" && v != null),
    ).toString();
    return apiFetch(`/api/users${query ? `?${query}` : ""}`);
  },
  create: (body) => apiFetch("/api/users", { method: "POST", body }),
  update: (id, body) => apiFetch(`/api/users/${id}`, { method: "PATCH", body }),
  remove: (id) => apiFetch(`/api/users/${id}`, { method: "DELETE" }),
};
