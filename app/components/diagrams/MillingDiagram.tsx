"use client";

import React from "react";

interface MillingDiagramProps {
  values: {
    foreDiameter: string;
    shankDiameter: string;
    totalLength: string;
    fluteLength: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function MillingDiagram({ values, onChange }: MillingDiagramProps) {
  return (
    <div className="relative w-full aspect-[2/1] bg-white rounded-xl border border-border-light p-8 flex items-center justify-center overflow-hidden">
      {/* SVG Container */}
      <svg
        viewBox="0 0 800 300"
        className="w-full h-full text-slate-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {/* Milling Tool Body */}
        {/* Shank */}
        <path d="M50 120 L300 120 L300 180 L50 180 Z" strokeWidth="2" className="text-slate-400" />
        
        {/* Neck */}
        <path d="M300 135 L350 135 L350 165 L300 165" strokeWidth="2" className="text-slate-400" />
        
        {/* Cutting Head (Flat) */}
        <path d="M350 110 L750 110 L750 190 L350 190 Z" strokeWidth="2" className="text-slate-600" />
        
        {/* Flute Details (Horizontal lines suggest flat end mill) */}
        <path d="M370 110 L370 190" strokeWidth="1" opacity="0.3" />
        <path d="M420 110 L420 190" strokeWidth="1" opacity="0.3" />
        <path d="M470 110 L470 190" strokeWidth="1" opacity="0.3" />
        <path d="M520 110 L520 190" strokeWidth="1" opacity="0.3" />
        <path d="M570 110 L570 190" strokeWidth="1" opacity="0.3" />
        <path d="M620 110 L620 190" strokeWidth="1" opacity="0.3" />
        <path d="M670 110 L670 190" strokeWidth="1" opacity="0.3" />
        <path d="M720 110 L720 190" strokeWidth="1" opacity="0.3" />

        {/* Dimension Lines */}
        {/* Ön Çap */}
        <path d="M760 110 L780 110" strokeDasharray="4" />
        <path d="M760 190 L780 190" strokeDasharray="4" />
        <path d="M780 110 L780 190" strokeWidth="1" />
        <path d="M775 110 L785 110" />
        <path d="M775 190 L785 190" />

        {/* Helis Boyu */}
        <line x1="350" y1="110" x2="350" y2="80" strokeDasharray="4" />
        <line x1="750" y1="110" x2="750" y2="80" strokeDasharray="4" />
        <path d="M350 80 L750 80" strokeWidth="1" />
        <path d="M350 75 L350 85" />
        <path d="M750 75 L750 85" />

        {/* Tam Boy */}
        <line x1="50" y1="180" x2="50" y2="240" strokeDasharray="4" />
        <line x1="750" y1="190" x2="750" y2="240" strokeDasharray="4" />
        <path d="M50 240 L750 240" strokeWidth="1" />
        <path d="M50 235 L50 245" />
        <path d="M750 235 L750 245" />

        {/* Arka Çap */}
        <line x1="50" y1="120" x2="30" y2="120" strokeDasharray="4" />
        <line x1="50" y1="180" x2="30" y2="180" strokeDasharray="4" />
        <path d="M30 120 L30 180" strokeWidth="1" />
        <path d="M25 120 L35 120" />
        <path d="M25 180 L35 180" />
      </svg>

      {/* Input Overlays */}
      {/* Ön Çap */}
      <div className="absolute top-[50%] right-[2%] -translate-y-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Ön Çap</label>
        <input
          type="number"
          value={values.foreDiameter}
          onChange={(e) => onChange("foreDiameter", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-primary/20 rounded-md text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
          placeholder="ø mm"
        />
      </div>

      {/* Arka Çap */}
      <div className="absolute top-[50%] left-[2%] -translate-y-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Arka Çap</label>
        <input
          type="number"
          value={values.shankDiameter}
          onChange={(e) => onChange("shankDiameter", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
          placeholder="ø mm"
        />
      </div>

      {/* Helis Boyu */}
      <div className="absolute top-[5%] right-[25%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Helis Boyu</label>
        <input
          type="number"
          value={values.fluteLength}
          onChange={(e) => onChange("fluteLength", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
          placeholder="L mm"
        />
      </div>

      {/* Tam Boy */}
      <div className="absolute bottom-[5%] left-[50%] -translate-x-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Tam Boy</label>
        <input
          type="number"
          value={values.totalLength}
          onChange={(e) => onChange("totalLength", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
          placeholder="L mm"
        />
      </div>
    </div>
  );
}
