"use client";

import { useState } from "react";
import {
  type ToolType,
  type MaterialType,
  type CoatingType,
  type PriceParams,
  MATERIAL_LABELS,
  COATING_LABELS,
} from "@/lib/pricing";

const COATING_OPTIONS: CoatingType[] = ["TiN", "TiAlN", "Diamond", "AlCrN"];
const MATERIAL_OPTIONS: MaterialType[] = ["hss", "carbide", "cobalt"];

interface ToolCategoryProps {
  toolType: ToolType;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  onApply: (params: PriceParams) => void;
}

export default function ToolCategory({
  toolType,
  title,
  subtitle,
  icon,
  iconBg,
  onApply,
}: ToolCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [diameter, setDiameter] = useState("");
  const [material, setMaterial] = useState<MaterialType>("hss");
  const [coatings, setCoatings] = useState<CoatingType[]>([]);

  const toggleCoating = (coating: CoatingType) => {
    setCoatings((prev) =>
      prev.includes(coating)
        ? prev.filter((c) => c !== coating)
        : [...prev, coating]
    );
  };

  const handleApply = () => {
    if (!diameter || parseFloat(diameter) <= 0) return;
    onApply({
      toolType,
      material,
      diameter: parseFloat(diameter),
      coatings,
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border card-hover overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-surface-alt/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
          >
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary">{subtitle}</p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Expandable content */}
      <div
        className={`transition-expand overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 border-t border-border-light pt-4 space-y-4 animate-fade-in">
          {/* Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-text-secondary uppercase mb-1.5">
                Boyutlar (MM)
              </label>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                placeholder="Çap"
                min="0.1"
                step="0.1"
                className="w-full px-3 py-2.5 bg-surface-alt border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-text-secondary uppercase mb-1.5">
                Malzeme Tipi
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as MaterialType)}
                className="w-full px-3 py-2.5 bg-surface-alt border border-border rounded-lg text-sm text-text-primary cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                {MATERIAL_OPTIONS.map((mat) => (
                  <option key={mat} value={mat}>
                    {MATERIAL_LABELS[mat]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Coatings */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-text-secondary uppercase mb-2">
              Kaplama Seçenekleri
            </label>
            <div className="flex flex-wrap gap-2">
              {COATING_OPTIONS.map((coating) => (
                <label
                  key={coating}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm cursor-pointer transition-all duration-150 select-none ${
                    coatings.includes(coating)
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-border bg-surface-alt text-text-secondary hover:border-primary/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={coatings.includes(coating)}
                    onChange={() => toggleCoating(coating)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      coatings.includes(coating)
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {coatings.includes(coating) && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  {COATING_LABELS[coating]}
                </label>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <div className="flex justify-end">
            <button
              onClick={handleApply}
              disabled={!diameter || parseFloat(diameter) <= 0}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm shadow-primary/15 hover:shadow-md hover:shadow-primary/25"
            >
              Parametreleri Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
