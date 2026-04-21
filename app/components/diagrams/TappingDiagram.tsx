"use client";

interface TappingDiagramProps {
  values: {
    foreDiameter: string;
    shankDiameter: string;
    fluteLength: string;
    totalLength: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function TappingDiagram({ values, onChange }: TappingDiagramProps) {
  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-[2/1] bg-white rounded-xl border border-border-light p-4 md:p-8 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 800 300" className="w-full h-full text-slate-300" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Tapping Body */}
          <path d="M50 120 L300 120 L300 180 L50 180 Z" strokeWidth="2" className="text-slate-400" />
          <path d="M300 120 L330 110 L330 190 L300 180" strokeWidth="2" className="text-slate-400" />
          <path d="M330 110 L700 110 L700 190 L330 190 Z" strokeWidth="2" className="text-slate-500" />
          <path d="M330 125 L700 125" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
          <path d="M330 140 L700 140" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
          <path d="M330 155 L700 155" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
          <path d="M330 170 L700 170" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
          <line x1="700" y1="110" x2="730" y2="110" strokeDasharray="4" />
          <line x1="700" y1="190" x2="730" y2="190" strokeDasharray="4" />
          <path d="M730 110 L730 190" strokeWidth="1" />
          <path d="M725 110 L735 110" />
          <path d="M725 190 L735 190" />
          <line x1="330" y1="110" x2="330" y2="80" strokeDasharray="4" />
          <line x1="700" y1="110" x2="700" y2="80" strokeDasharray="4" />
          <path d="M330 80 L700 80" strokeWidth="1" />
          <path d="M330 75 L330 85" />
          <path d="M700 75 L700 85" />
          <line x1="50" y1="180" x2="50" y2="240" strokeDasharray="4" />
          <line x1="700" y1="190" x2="700" y2="240" strokeDasharray="4" />
          <path d="M50 240 L700 240" strokeWidth="1" />
          <path d="M50 235 L50 245" />
          <path d="M700 235 L700 245" />
          <line x1="50" y1="120" x2="30" y2="120" strokeDasharray="4" />
          <line x1="50" y1="180" x2="30" y2="180" strokeDasharray="4" />
          <path d="M30 120 L30 180" strokeWidth="1" />
          <path d="M25 120 L35 120" />
          <path d="M25 180 L35 180" />
        </svg>

        <div className="hidden lg:block absolute top-[50%] right-[2%] -translate-y-[50%]">
          <InputOverlay label="Ön Çap" value={values.foreDiameter} onChange={(v) => onChange("foreDiameter", v)} />
        </div>
        <div className="hidden lg:block absolute top-[50%] left-[2%] -translate-y-[50%]">
          <InputOverlay label="Arka Çap" value={values.shankDiameter} onChange={(v) => onChange("shankDiameter", v)} />
        </div>
        <div className="hidden lg:block absolute top-[5%] right-[25%]">
          <InputOverlay label="Diş Boyu" value={values.fluteLength} onChange={(v) => onChange("fluteLength", v)} />
        </div>
        <div className="hidden lg:block absolute bottom-[5%] left-[50%] -translate-x-[50%]">
          <InputOverlay label="Tam Boy" value={values.totalLength} onChange={(v) => onChange("totalLength", v)} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:hidden">
        <MobileInput label="Ön Çap" value={values.foreDiameter} onChange={(v) => onChange("foreDiameter", v)} unit="mm" />
        <MobileInput label="Arka Çap" value={values.shankDiameter} onChange={(v) => onChange("shankDiameter", v)} unit="mm" />
        <MobileInput label="Diş Boyu" value={values.fluteLength} onChange={(v) => onChange("fluteLength", v)} unit="mm" />
        <MobileInput label="Tam Boy" value={values.totalLength} onChange={(v) => onChange("totalLength", v)} unit="mm" />
      </div>
    </div>
  );
}

function InputOverlay({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col items-center">
      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 bg-white/80 px-1">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className="w-16 h-8 text-center bg-white border-2 border-primary/20 rounded-md text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" />
    </div>
  );
}

function MobileInput({ label, value, onChange, unit }: { label: string; value: string; onChange: (v: string) => void; unit: string }) {
  return (
    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</label>
      <div className="relative">
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-primary transition-all" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">{unit}</span>
      </div>
    </div>
  );
}
