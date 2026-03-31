export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Admin login URL — preserves current path as ?next= so login returns to destination
export const getLoginUrl = () => {
  if (typeof window === 'undefined') return '/admin/login';
  const next = encodeURIComponent(window.location.pathname + window.location.search);
  return `/admin/login?next=${next}`;
};
