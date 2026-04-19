"use client";

import { useState } from "react";
import ToolCategory from "@/app/components/ToolCategory";
import PriceSummary from "@/app/components/PriceSummary";
import {
  calculatePrice,
  type PriceParams,
  type PriceBreakdown,
  TOOL_LABELS,
} from "@/lib/pricing";

// Tool category icons & colors
const toolConfigs = [
  {
    toolType: "drill" as const,
    iconBg: "bg-primary/10 text-primary",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    toolType: "milling" as const,
    iconBg: "bg-purple-100 text-purple-600",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
        <path d="M16 19h6" /><path d="M19 22v-6" />
      </svg>
    ),
  },
  {
    toolType: "reamer" as const,
    iconBg: "bg-orange-100 text-orange-600",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="5" r="2" />
        <circle cx="19" cy="19" r="2" /><circle cx="5" cy="19" r="2" />
        <line x1="12" y1="9" x2="12" y2="2" /><line x1="15" y1="12" x2="22" y2="12" />
        <line x1="12" y1="15" x2="12" y2="22" /><line x1="9" y1="12" x2="2" y2="12" />
      </svg>
    ),
  },
  {
    toolType: "tapping" as const,
    iconBg: "bg-teal-100 text-teal-600",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [activeToolLabel, setActiveToolLabel] = useState("");

  const handleApply = (params: PriceParams) => {
    const breakdown = calculatePrice(params);
    setPriceBreakdown(breakdown);
    setActiveToolLabel(
      `${TOOL_LABELS[params.toolType].en} / ${TOOL_LABELS[params.toolType].tr}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Fiyat Hesaplayıcı
        </h1>
        <p className="text-sm text-text-secondary">
          Hassas mühendislik uç parametrelerini yapılandırarak anlık fiyat
          tahmini alın. Aşağıdan uç tipini seçerek hesaplamaya başlayın.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Tool categories */}
        <div className="lg:col-span-2 space-y-3">
          {toolConfigs.map((config) => (
            <ToolCategory
              key={config.toolType}
              toolType={config.toolType}
              title={`${TOOL_LABELS[config.toolType].en} / ${TOOL_LABELS[config.toolType].tr}`}
              subtitle={TOOL_LABELS[config.toolType].desc}
              icon={config.icon}
              iconBg={config.iconBg}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* Right — Price summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PriceSummary
              breakdown={priceBreakdown}
              toolLabel={activeToolLabel}
            />

            {/* Pro tip card */}
            <div className="mt-4 bg-surface rounded-xl border border-border overflow-hidden">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 relative">
                <span className="inline-block px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase rounded tracking-wider mb-2">
                  Pro İpucu
                </span>
                <p className="text-white text-sm font-medium leading-relaxed">
                  50 adet üzeri toplu siparişlerde ücretsiz TiN kaplama avantajından
                  yararlanın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
