"use client";

import Image from "next/image";
import { type ToolType } from "@/lib/pricing";

interface StaticImageDiagramProps {
  toolType: ToolType;
  values: {
    foreDiameter: string;
    shankDiameter: string;
    fluteLength: string;
    totalLength: string;
  };
  onChange: (field: string, value: string) => void;
}

const IMAGE_MAP: Record<ToolType, string> = {
  drill: "/upscalemedia-image4.jpeg",
  milling: "/upscalemedia-image2.jpeg",
  reamer: "/upscalemedia-image1.jpeg",
  tapping: "/upscalemedia-image3.jpeg",
};

/**
 * Maps our internal dimension keys to the visual labels in the customer's images.
 */
const LABEL_MAP: Record<ToolType, Record<string, string>> = {
  drill: {
    foreDiameter: "Çap (D)",
    shankDiameter: "Arka Çap (D)",
    fluteLength: "Helis Boyu (l)",
    totalLength: "Tam Boy (L)",
  },
  milling: {
    foreDiameter: "Kesme Çapı (d)",
    shankDiameter: "Arka Çap (D)",
    fluteLength: "Helis Boyu (L1)",
    totalLength: "Tam Boy (L)",
  },
  reamer: {
    foreDiameter: "Kesme Çapı (D)",
    shankDiameter: "Arka Çap (D1)",
    fluteLength: "Helis Boyu (L1)",
    totalLength: "Tam Boy (L)",
  },
  tapping: {
    foreDiameter: "Kafa Çapı (d1)",
    shankDiameter: "Arka Çap (d2)",
    fluteLength: "Kafa Kalınlığı (b)",
    totalLength: "Tam Boy (L1)",
  },
};

export default function StaticImageDiagram({
  toolType,
  values,
  onChange,
}: StaticImageDiagramProps) {
  const labels = LABEL_MAP[toolType];

  return (
    <div className="space-y-6">
      {/* Photo Container */}
      <div className="relative w-full aspect-[2/1] bg-white rounded-2xl border border-slate-100 p-2 md:p-4 flex items-center justify-center overflow-hidden shadow-inner">
        <Image
          src={IMAGE_MAP[toolType]}
          alt={`${toolType} teknik çizim`}
          fill
          className="object-contain p-2"
          priority
        />
      </div>

      {/* Input Grid - Unified for all viewports */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DimensionInput
          label={labels.foreDiameter}
          value={values.foreDiameter}
          onChange={(v) => onChange("foreDiameter", v)}
        />
        <DimensionInput
          label={labels.shankDiameter}
          value={values.shankDiameter}
          onChange={(v) => onChange("shankDiameter", v)}
        />
        <DimensionInput
          label={labels.fluteLength}
          value={values.fluteLength}
          onChange={(v) => onChange("fluteLength", v)}
        />
        <DimensionInput
          label={labels.totalLength}
          value={values.totalLength}
          onChange={(v) => onChange("totalLength", v)}
        />
      </div>
    </div>
  );
}

function DimensionInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 transition-all hover:border-primary/20">
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 whitespace-nowrap">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
          placeholder="0.00"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
          mm
        </span>
      </div>
    </div>
  );
}
