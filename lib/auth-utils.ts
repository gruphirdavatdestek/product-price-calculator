/**
 * Admin Yetkilendirme Yardımcıları
 */

// Yönetici e-posta listesi
export const ADMIN_EMAILS = [
  "deniz@gmail.com",
  "beril@gmail.com"
];

/**
 * Verilen e-posta adresinin yönetici olup olmadığını kontrol eder.
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
