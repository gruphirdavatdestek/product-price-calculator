import LoginForm from "@/app/components/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8ecf8] via-[#f0f2f8] to-[#e4e9f5] px-4 py-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
      </div>

      {/* Logo & Title */}
      <div className="relative z-10 text-center mb-8 animate-fade-in flex flex-col items-center">
        <img src="/dj-plus-logo.png" alt="DJ Plus" className="h-16 w-auto object-contain mb-2" />
        <p className="text-sm text-text-secondary mt-1">
          Uç Fiyat Hesaplama Sistemi
        </p>
      </div>

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-[420px] bg-surface rounded-3xl shadow-2xl shadow-black/5 border border-border-light p-6 md:p-8 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <LoginForm />
      </div>

      <div
        className="relative z-10 mt-8 text-center text-xs text-text-muted animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <p>© 2026 DJ Plus. Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
}
