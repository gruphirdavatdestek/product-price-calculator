"use client";

import React from "react";

interface ReamerDiagramProps {
  values: {
    foreDiameter: string;
    shankDiameter: string;
    totalLength: string;
    fluteLength: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function ReamerDiagram({ values, onChange }: ReamerDiagramProps) {
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
        {/* Reamer Body */}
        {/* Shank */}
        <path d="M50 125 L300 125 L300 175 L50 175 Z" strokeWidth="2" className="text-slate-400" />
        
        {/* Neck (Thinner) */}
        <path d="M300 140 L400 140 L400 160 L300 160" strokeWidth="2" className="text-slate-400" />
        
        {/* Reamer Head (Slightly tapered or straight with straight flutes) */}
        <path d="M400 120 L750 120 L750 180 L400 180 Z" strokeWidth="2" className="text-slate-600" />
        
        {/* Straight Flutes */}
        <line x1="400" y1="135" x2="750" y2="135" strokeWidth="1" opacity="0.4" />
        <line x1="400" y1="150" x2="750" y2="150" strokeWidth="1" opacity="0.4" />
        <line x1="400" y1="165" x2="750" y2="165" strokeWidth="1" opacity="0.4" />

        {/* Dimension Lines */}
        {/* Ön Çap */}
        <path d="M760 120 L780 120" strokeDasharray="4" />
        <path d="M760 180 L780 180" strokeDasharray="4" />
        <path d="M780 120 L780 180" strokeWidth="1" />
        <path d="M775 120 L785 120" />
        <path d="M775 180 L785 180" />

        {/* Helis/Çalışma Boyu */}
        <line x1="400" y1="120" x2="400" y2="80" strokeDasharray="4" />
        <line x1="750" y1="120" x2="750" y2="80" strokeDasharray="4" />
        <path d="M400 80 L750 80" strokeWidth="1" />
        <path d="M400 75 L400 85" />
        <path d="M750 75 L750 85" />

        {/* Tam Boy */}
        <line x1="50" y1="175" x2="50" y2="240" strokeDasharray="4" />
        <line x1="750" y1="180" x2="750" y2="240" strokeDasharray="4" />
        <path d="M50 240 L750 240" strokeWidth="1" />
        <path d="M50 235 L50 245" />
        <path d="M750 235 L750 245" />

        {/* Arka Çap */}
        <line x1="50" y1="125" x2="30" y2="125" strokeDasharray="4" />
        <line x1="50" y1="175" x2="30" y2="175" strokeDasharray="4" />
        <path d="M30 125 L30 175" strokeWidth="1" />
        <path d="M25 125 L35 125" />
        <path d="M25 175 L35 175" />
      </svg>

      {/* Input Overlays */}
      <div className="absolute top-[50%] right-[2%] -translate-y-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Ön Çap</label>
        <input
          type="number"
          value={values.foreDiameter}
          onChange={(e) => onChange("foreDiameter", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-primary/20 rounded-md text-sm outline-none shadow-sm"
          placeholder="ø mm"
        />
      </div>
      <div className="absolute top-[50%] left-[2%] -translate-y-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Arka Çap</label>
        <input
          type="number"
          value={values.shankDiameter}
          onChange={(e) => onChange("shankDiameter", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm outline-none shadow-sm"
          placeholder="ø mm"
        />
      </div>
      <div className="absolute top-[5%] right-[30%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Çalışma Boyu</label>
        <input
          type="number"
          value={values.fluteLength}
          onChange={(e) => onChange("fluteLength", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm outline-none shadow-sm"
          placeholder="L mm"
        />
      </div>
      <div className="absolute bottom-[5%] left-[50%] -translate-x-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Tam Boy</label>
        <input
          type="number"
          value={values.totalLength}
          onChange={(e) => onChange("totalLength", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm outline-none shadow-sm"
          placeholder="L mm"
        />
      </div>
    </div>
  );
}
