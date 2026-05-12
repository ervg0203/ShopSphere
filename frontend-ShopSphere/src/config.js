const raw =
  process.env.REACT_APP_API_URL || "https://shopsphere-lu1j.onrender.com";

/** Base URL for the backend API (no trailing slash). */
export const API_URL = raw.replace(/\/+$/, "");
