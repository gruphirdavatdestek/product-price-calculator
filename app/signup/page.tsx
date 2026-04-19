import SignUpForm from "@/app/components/SignUpForm";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8ecf8] via-[#f0f2f8] to-[#e4e9f5] px-4 py-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Logo & Title */}
      <div className="relative z-10 text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow-lg shadow-primary/25 mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          GRUP HİRDAVAT
        </h1>
        <p className="text-sm text-text-secondary mt-1">Yeni Hesap Oluştur</p>
      </div>

      {/* Sign Up Card */}
      <div
        className="relative z-10 w-full max-w-[420px] bg-surface rounded-2xl shadow-xl shadow-black/5 border border-border-light p-8 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <SignUpForm />
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-8 text-center text-xs text-text-muted animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <p>© 2026 Grup Hirdavat. Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
}
