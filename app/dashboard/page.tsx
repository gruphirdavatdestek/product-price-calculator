"use client";

import { useState, useEffect } from "react";
import PriceSummary from "@/app/components/PriceSummary";
import { createClient } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/auth-utils";
import {
  calculatePrice,
  type PriceParams,
  type PriceBreakdown,
  type ToolType,
  type MaterialType,
  type CoatingType,
  TOOL_LABELS,
  MATERIAL_LABELS,
  COATING_LABELS,
  DRILL_SUBTYPES,
  DRILL_EXTRAS,
  MILLING_SUBTYPES,
  MILLING_EXTRAS,
  REAMER_SUBTYPES,
  TAPPING_SUBTYPES,
} from "@/lib/pricing";
import { fetchPricingConfig, type FullPricingConfig } from "@/lib/config-api";

import DrillDiagram from "@/app/components/diagrams/DrillDiagram";
import MillingDiagram from "@/app/components/diagrams/MillingDiagram";
import ReamerDiagram from "@/app/components/diagrams/ReamerDiagram";
import TappingDiagram from "@/app/components/diagrams/TappingDiagram";

export default function DashboardPage() {
  const [toolType, setToolType] = useState<ToolType>("milling");
  const [subType, setSubType] = useState("Düz");
  const [material] = useState<MaterialType>("carbide");
  const [coatings, setCoatings] = useState<CoatingType | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [taslama, setTaslama] = useState<{
    type: "Boğaz" | "Konik" | null;
    diameter: string;
    length: string;
  }>({ type: null, diameter: "", length: "" });
  const [dimensions, setDimensions] = useState({
    foreDiameter: "10",
    shankDiameter: "10",
    totalLength: "100",
    fluteLength: "50",
  });

  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(
    null,
  );
  const [pricingConfig, setPricingConfig] = useState<FullPricingConfig | null>(
    null,
  );
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load config and auth on mount
  useEffect(() => {
    async function init() {
      const supabase = createClient();

      // Check admin status
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsUserAdmin(isAdmin(user?.email));

      // Load pricing config
      const config = await fetchPricingConfig();
      if (config) {
        setPricingConfig(config);
      }
    }
    init();
  }, []);

  // Recalculate price whenever inputs change
  useEffect(() => {
    if (!pricingConfig) return;

    const d1 = parseFloat(dimensions.foreDiameter) || 0;
    const d2 = parseFloat(dimensions.shankDiameter) || 0;
    const l1 = parseFloat(dimensions.totalLength) || 0;
    const l2 = parseFloat(dimensions.fluteLength) || 0;

    // Validation
    if (d1 <= d2) {
      setValidationError("Ön Çap (d1), Arka Çap'tan (d2) büyük olmalıdır.");
      setPriceBreakdown(null);
      return;
    }
    if (l1 <= l2) {
      setValidationError("Tam Boy (L), Kesme Boyu'ndan (l) büyük olmalıdır.");
      setPriceBreakdown(null);
      return;
    }

    setValidationError(null);

    const params: PriceParams = {
      toolType,
      material,
      diameter: d1,
      shankDiameter: d2,
      totalLength: l1,
      fluteLength: l2,
      coatings,
      taslama: taslama.type
        ? {
            type: taslama.type,
            diameter: parseFloat(taslama.diameter) || 0,
            length: parseFloat(taslama.length) || 0,
          }
        : null,
      extraOptions: extras,
      subType,
    };
    const breakdown = calculatePrice(params, pricingConfig);
    setPriceBreakdown(breakdown);
  }, [
    toolType,
    material,
    dimensions,
    coatings,
    extras,
    subType,
    taslama,
    pricingConfig,
  ]);

  const handleDimensionChange = (key: string, value: string) => {
    setDimensions((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCoating = (coating: CoatingType) => {
    setCoatings((prev) => (prev === coating ? null : coating));
  };

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra],
    );
  };

  const renderDiagram = () => {
    switch (toolType) {
      case "drill":
        return (
          <DrillDiagram values={dimensions} onChange={handleDimensionChange} />
        );
      case "milling":
        return (
          <MillingDiagram
            values={dimensions}
            onChange={handleDimensionChange}
          />
        );
      case "reamer":
        return (
          <ReamerDiagram values={dimensions} onChange={handleDimensionChange} />
        );
      case "tapping":
        return (
          <TappingDiagram
            values={dimensions}
            onChange={handleDimensionChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Left Side — Calculator */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                  Fiyat Hesaplayıcı
                </h1>
                <p className="text-slate-500 text-xs md:text-sm">
                  Ürün tipini seçin ve ölçüleri girin.
                </p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-fit border border-slate-200/50 shadow-inner overflow-x-auto no-scrollbar">
                <div className="flex min-w-full sm:min-w-0">
                  {Object.entries(TOOL_LABELS).map(([id, label]) => {
                    const isActive = toolType === id;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          const val = id as ToolType;
                          setToolType(val);
                          const defaultSubType =
                            val === "milling" ? "Düz" : "Standart";
                          setSubType(defaultSubType);
                          setExtras([]);
                        }}
                        className={`flex-1 sm:flex-none whitespace-nowrap px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-white text-primary shadow-md shadow-primary/10 ring-1 ring-slate-200"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {label.tr}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="mb-0">{renderDiagram()}</div>

            {/* Validation Error */}
            {validationError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                <div className="p-2 bg-red-100 rounded-xl text-red-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-900">Geçersiz Ölçü</h4>
                  <p className="text-xs text-red-700 font-medium">{validationError}</p>
                </div>
              </div>
            )}

            {/* Options Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Product Sub-Types */}
              <div>
                <label className="block text-[10px] md:text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                  Ürün Tipi
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(pricingConfig?.multipliers?.[toolType] || (
                    toolType === "drill"
                      ? DRILL_SUBTYPES
                      : toolType === "milling"
                        ? MILLING_SUBTYPES
                        : toolType === "reamer"
                          ? REAMER_SUBTYPES
                          : TAPPING_SUBTYPES
                  )).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSubType(type)}
                      className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                        subType === type
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coating Options */}
              <div>
                <label className="block text-[10px] md:text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                  Kaplama
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    pricingConfig?.coatings?.types ||
                    Object.keys(COATING_LABELS)
                  ).map((id) => {
                    const label =
                      COATING_LABELS[id as CoatingType] ||
                      id.replace(/_/g, " ").toUpperCase();
                    return (
                      <button
                        key={id}
                        onClick={() => toggleCoating(id as CoatingType)}
                        className={`px-3 py-2 rounded-lg text-[10px] md:text-xs font-bold transition-all border ${
                          coatings === id
                            ? "bg-primary/5 border-primary text-primary"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grinding Options (Taşlama) */}
              <div className="col-span-1 md:col-span-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <label className="block text-[10px] md:text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                  Taşlama Operasyonu
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                  {["Boğaz", "Konik"].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setTaslama((prev) => ({
                          ...prev,
                          type:
                            prev.type === type
                              ? null
                              : (type as "Boğaz" | "Konik"),
                        }))
                      }
                      className={`flex-1 sm:flex-none px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                        taslama.type === type
                          ? "bg-orange-600 border-orange-600 text-white shadow-md"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {type} Taşlama
                    </button>
                  ))}
                </div>

                {taslama.type && (
                  <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">
                        Taşlama Çapı (d)
                      </label>
                      <input
                        type="number"
                        value={taslama.diameter}
                        onChange={(e) =>
                          setTaslama((prev) => ({
                            ...prev,
                            diameter: e.target.value,
                          }))
                        }
                        placeholder="mm"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-orange-500 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">
                        Taşlama Boyu (l)
                      </label>
                      <input
                        type="number"
                        value={taslama.length}
                        onChange={(e) =>
                          setTaslama((prev) => ({
                            ...prev,
                            length: e.target.value,
                          }))
                        }
                        placeholder="mm"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-orange-500 text-sm font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side — Summary */}
        <div className="w-full lg:w-80">
          <div className="static lg:sticky lg:top-24 space-y-4">
            <PriceSummary
              breakdown={priceBreakdown}
              toolLabel={`${TOOL_LABELS[toolType].tr} (${subType})`}
              salesConfig={pricingConfig?.sales}
              isAdmin={isUserAdmin}
            />

            <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                  Teknik Not
                </span>
              </div>
              <p className="text-xs md:text-sm font-medium leading-relaxed">
                Ölçüler mm cinsinden girilmelidir. Özel çap talepleriniz için
                teknik birim ile iletişime geçiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
