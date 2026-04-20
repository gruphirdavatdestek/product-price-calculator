"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
      {/* Left — Logo & Nav */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <span className="font-bold text-text-primary text-sm tracking-tight">
            Grup Hirdavat
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <button
            className="px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer text-primary font-semibold"
          >
            Dashboard
          </button>
        </nav>
      </div>

      {/* Right — Search + Actions */}
      <div className="flex items-center gap-3">
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
  );
}
