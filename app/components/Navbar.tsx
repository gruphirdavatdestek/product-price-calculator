"use client";

import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || null);
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserAdmin = isAdmin(userEmail);

  return (
    <>
      <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-50">
        {/* Left — Logo & Nav */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/dashboard")}>
            <img src="/dj-plus-logo.png" alt="DJ Plus" className="h-8 md:h-9 w-auto object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer text-primary font-semibold"
            >
              Dashboard
            </button>
            {isUserAdmin && (
              <button
                onClick={() => router.push("/dashboard/admin")}
                className="px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer text-slate-600 hover:text-primary font-medium"
              >
                Yönetici Paneli
              </button>
            )}
          </nav>
        </div>

        {/* Right — Search + Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>

          {/* Avatar / Logout */}
          <button
            onClick={handleLogout}
            className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm hover:bg-primary/20 transition-colors cursor-pointer"
            title="Çıkış Yap"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border p-4 space-y-2 animate-in slide-in-from-top-4" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { router.push("/dashboard"); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-primary bg-primary/5"
            >
              Dashboard
            </button>
            {isUserAdmin && (
              <button
                onClick={() => { router.push("/dashboard/admin"); setIsMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Yönetici Paneli
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
