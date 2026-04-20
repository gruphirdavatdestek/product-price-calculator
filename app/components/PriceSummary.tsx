"use client";

import {
  type PriceBreakdown,
  type CoatingType,
  COATING_LABELS,
} from "@/lib/pricing";

interface PriceSummaryProps {
  breakdown: PriceBreakdown | null;
  toolLabel: string;
}

export default function PriceSummary({
  breakdown,
  toolLabel,
}: PriceSummaryProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
          </svg>
        </div>
        <h3 className="font-bold text-lg text-text-primary">Özet</h3>
      </div>

      {breakdown ? (
        <>
          {/* Selected options */}
          <div>
            <p className="text-xs font-semibold tracking-wider text-text-secondary uppercase mb-3">
              Seçilen Opsiyonlar
            </p>
            <div className="space-y-2.5">
              {breakdown.rawMaterialCost > 0 && (
                <div className="flex items-center justify-between py-2 px-3 bg-blue-50/50 border border-blue-100/50 rounded-lg animate-fade-in">
                  <span className="text-sm text-blue-700 font-medium">
                    Hammadde
                  </span>
                  <span className="text-sm font-semibold text-blue-900">
                    €{breakdown.rawMaterialCost.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-2 px-3 bg-indigo-50/50 border border-indigo-100/50 rounded-lg animate-fade-in">
                <span className="text-sm text-indigo-700 font-medium">
                  Bileme
                </span>
                <span className="text-sm font-semibold text-indigo-900">
                  €{breakdown.bilemeCost}
                </span>
              </div>

              {breakdown.coatingDetails.map((coating) => (
                <div
                  key={coating.name}
                  className="flex items-center justify-between py-2 px-3 bg-surface-alt rounded-lg animate-fade-in"
                >
                  <span className="text-sm text-text-secondary">
                    {COATING_LABELS[coating.name as CoatingType] ||
                      coating.name}{" "}
                    Kaplama
                  </span>
                  <span className="text-sm font-semibold text-text-primary">
                    €{coating.surcharge.toFixed(2)}
                  </span>
                </div>
              ))}

              {breakdown.extraOptionDetails.map((extra) => (
                <div
                  key={extra.name}
                  className="flex items-center justify-between py-2 px-3 bg-orange-50/50 border border-orange-100/50 rounded-lg animate-fade-in"
                >
                  <span className="text-sm text-orange-700 font-medium">
                    {extra.name} Farkı
                  </span>
                  <span className="text-sm font-semibold text-orange-900">
                    €{extra.surcharge.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4">
            <p className="text-xs font-semibold tracking-wider text-text-secondary uppercase mb-2">
              Toplam Maliyet
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-text-primary">
                €{breakdown.finalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-text-muted">EUR</span>
            </div>
          </div>

          {/* Sales Prices */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-sm font-medium text-slate-600">
                Min. Satış Bedeli
              </span>
              <span className="text-lg font-bold text-slate-900">
                €{(breakdown.finalPrice * 1.2).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200 shadow-sm">
              <span className="text-sm font-bold text-green-700">
                Peşin Satış Fiyatı
              </span>
              <span className="text-lg font-bold text-green-800">
                €{(breakdown.finalPrice * 1.4).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm">
              <span className="text-sm font-bold text-blue-700">
                Vadeli Satış Fiyatı
              </span>
              <span className="text-lg font-bold text-blue-800">
                €{(breakdown.finalPrice * 1.8).toFixed(2)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
            >
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="15" y2="16" />
            </svg>
          </div>
          <p className="text-sm text-text-muted">
            Bir ürün seçip parametreleri uygulayın
          </p>
        </div>
      )}
    </div>
  );
}
