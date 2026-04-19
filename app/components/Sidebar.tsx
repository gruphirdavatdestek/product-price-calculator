"use client";

import { useState } from "react";

const menuItems = [
  {
    label: "Genel Bakış",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    label: "Fiyat Hesapla",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Operasyonlar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Analiz",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    ),
  },
  {
    label: "Özet",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <aside className="w-60 bg-surface border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-text-primary">Core Engine</p>
            <p className="text-xs text-text-muted uppercase tracking-wider">
              Yönetim Sistemi
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-0.5">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(i)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
              activeIndex === i
                ? "bg-primary/8 text-primary font-semibold"
                : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
            }`}
          >
            <span className={activeIndex === i ? "text-primary" : "text-text-muted"}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border space-y-2">
        <button className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
          Yeni Hesaplama
        </button>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-alt transition-colors cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
            </svg>
            Yardım Merkezi
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-alt transition-colors cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            Hesap
          </button>
        </div>
      </div>
    </aside>
  );
}
