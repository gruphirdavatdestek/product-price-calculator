"use client";

import React from "react";

interface TappingDiagramProps {
  values: {
    foreDiameter: string;
    shankDiameter: string;
    totalLength: string;
    fluteLength: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function TappingDiagram({ values, onChange }: TappingDiagramProps) {
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
        {/* Tapping Tool Body */}
        {/* Shank */}
        <path d="M50 120 L350 120 L350 180 L50 180 Z" strokeWidth="2" className="text-slate-400" />
        
        {/* Threaded Section */}
        <path d="M350 115 L750 115 L750 185 L350 185 Z" strokeWidth="2" className="text-slate-700" />
        
        {/* Threads (Zigzag effect) */}
        <path d="M370 115 L380 185 M390 115 L400 185 M410 115 L420 185 M430 115 L440 185 M450 115 L460 185 M470 115 L480 185 M490 115 L500 185 M510 115 L520 185 M530 115 L540 185 M550 115 L560 185 M570 115 L580 185 M590 115 L600 185 M610 115 L620 185 M630 115 L640 185 M650 115 L660 185 M670 115 L680 185 M690 115 L700 185 M710 115 L720 185 M730 115 L740 185" strokeWidth="1" opacity="0.5" />

        {/* Dimension Lines */}
        {/* Ön Çap */}
        <path d="M760 115 L780 115" strokeDasharray="4" />
        <path d="M760 185 L780 185" strokeDasharray="4" />
        <path d="M780 115 L780 185" strokeWidth="1" />
        <path d="M775 115 L785 115" />
        <path d="M775 185 L785 185" />

        {/* Diş Boyu */}
        <line x1="350" y1="115" x2="350" y2="80" strokeDasharray="4" />
        <line x1="750" y1="115" x2="750" y2="80" strokeDasharray="4" />
        <path d="M350 80 L750 80" strokeWidth="1" />
        <path d="M350 75 L350 85" />
        <path d="M750 75 L750 85" />

        {/* Tam Boy */}
        <line x1="50" y1="180" x2="50" y2="240" strokeDasharray="4" />
        <line x1="750" y1="185" x2="750" y2="240" strokeDasharray="4" />
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
      <div className="absolute top-[50%] right-[2%] -translate-y-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Anma Çapı</label>
        <input
          type="number"
          value={values.foreDiameter}
          onChange={(e) => onChange("foreDiameter", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-primary/20 rounded-md text-sm outline-none shadow-sm"
          placeholder="M ø"
        />
      </div>
      <div className="absolute top-[50%] left-[2%] -translate-y-[50%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Sap Çapı</label>
        <input
          type="number"
          value={values.shankDiameter}
          onChange={(e) => onChange("shankDiameter", e.target.value)}
          className="w-16 h-8 text-center bg-white border-2 border-slate-200 rounded-md text-sm outline-none shadow-sm"
          placeholder="ø mm"
        />
      </div>
      <div className="absolute top-[5%] right-[30%] flex flex-col items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">Diş Boyu</label>
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
