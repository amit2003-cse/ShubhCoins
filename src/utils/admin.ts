export const ADMIN_EMAILS = [
  "abhishek1973kr@gmail.com",
  "amit4321sg@gmail.com",
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
