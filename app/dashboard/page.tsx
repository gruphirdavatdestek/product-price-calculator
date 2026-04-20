"use client";

import { useState, useEffect } from "react";
import PriceSummary from "@/app/components/PriceSummary";
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

  // Recalculate price whenever inputs change
  useEffect(() => {
    const params: PriceParams = {
      toolType,
      material,
      diameter: parseFloat(dimensions.foreDiameter) || 0,
      shankDiameter: parseFloat(dimensions.shankDiameter) || 0,
      totalLength: parseFloat(dimensions.totalLength) || 0,
      fluteLength: parseFloat(dimensions.fluteLength) || 0,
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
    const breakdown = calculatePrice(params);
    setPriceBreakdown(breakdown);
  }, [toolType, material, dimensions, coatings, extras, subType, taslama]);

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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side — Calculator */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Fiyat Hesaplayıcı
                </h1>
                <p className="text-slate-500 text-sm">
                  Ürün tipini seçin ve ölçüleri girin.
                </p>
              </div>
              <select
                value={toolType}
                onChange={(e) => {
                  const val = e.target.value as ToolType;
                  setToolType(val);
                  // Reset subtypes and extras when tool changes
                  const defaultSubType = val === "milling" ? "Düz" : "Standart";
                  setSubType(defaultSubType);
                  setExtras([]);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none font-medium h-11 min-w-[180px]"
              >
                {Object.entries(TOOL_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label.tr} ({label.en})
                  </option>
                ))}
              </select>
            </div>

            {/* Visual Diagram */}
            <div className="mb-8">{renderDiagram()}</div>

            {/* Options Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Sub-Types */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Ürün Tipi
                </label>
                <div className="flex flex-wrap gap-2">
                  {(toolType === "drill"
                    ? DRILL_SUBTYPES
                    : toolType === "milling"
                      ? MILLING_SUBTYPES
                      : toolType === "reamer"
                        ? REAMER_SUBTYPES
                        : TAPPING_SUBTYPES
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSubType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        subType === type
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coating Options */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Kaplama
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(COATING_LABELS).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => toggleCoating(id as CoatingType)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                        coatings === id
                          ? "bg-primary-light/10 border-primary text-primary"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grinding Options (Taşlama) */}
              <div className="col-span-1 md:col-span-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Taşlama Operasyonu
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
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
                      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border ${
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
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
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-orange-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
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
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-orange-500 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Extras (Polisaj) */}
              {/* <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Diğer Opsiyonlar
                </label>
                <div className="flex flex-wrap gap-2">
                  {(toolType === "drill"
                    ? DRILL_EXTRAS
                    : toolType === "milling"
                      ? MILLING_EXTRAS
                      : []
                  ).map((extra) => (
                    <button
                      key={extra}
                      onClick={() => toggleExtra(extra)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                        extras.includes(extra)
                          ? "bg-blue-600 border-blue-600 text-white shadow-md"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {extra}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Right Side — Summary */}
        <div className="lg:w-80">
          <div className="sticky top-6 space-y-4">
            <PriceSummary
              breakdown={priceBreakdown}
              toolLabel={`${TOOL_LABELS[toolType].tr} (${subType})`}
            />

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                  Teknik Not
                </span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
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
