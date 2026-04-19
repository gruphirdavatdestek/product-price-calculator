"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text-primary">Kayıt Başarılı!</h3>
        <p className="text-sm text-text-secondary">
          E-posta adresinize bir doğrulama linki gönderildi. Lütfen e-postanızı kontrol edin.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Giriş Sayfasına Dön
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {/* Email */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-text-secondary uppercase mb-2">
          E-Posta Adresi
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            className="w-full pl-11 pr-4 py-3 bg-surface-alt border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted transition-all duration-200"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-text-secondary uppercase mb-2">
          Şifre
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="En az 6 karakter"
            className="w-full pl-11 pr-4 py-3 bg-surface-alt border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted transition-all duration-200"
            required
            minLength={6}
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-text-secondary uppercase mb-2">
          Şifre Tekrar
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </span>
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Şifrenizi tekrar girin"
            className="w-full pl-11 pr-4 py-3 bg-surface-alt border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted transition-all duration-200"
            required
            minLength={6}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-danger animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        id="signup-submit"
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Kayıt yapılıyor...
          </>
        ) : (
          <>
            Kayıt Ol
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </>
        )}
      </button>

      {/* Link to login */}
      <p className="text-center text-sm text-text-secondary">
        Zaten hesabınız var mı?{" "}
        <Link href="/" className="text-primary font-semibold hover:underline">
          Giriş Yap
        </Link>
      </p>
    </form>
  );
}
