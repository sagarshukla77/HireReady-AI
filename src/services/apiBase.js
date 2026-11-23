const configuredApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = configuredApiUrl
  ? /^https?:\/\//i.test(configuredApiUrl)
    ? configuredApiUrl.replace(/\/$/, "")
    : `https://${configuredApiUrl.replace(/\/$/, "")}/api`
  : "/api";
