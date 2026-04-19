"use client";

import { type PriceBreakdown, type CoatingType, COATING_LABELS } from "@/lib/pricing";

interface PriceSummaryProps {
  breakdown: PriceBreakdown | null;
  toolLabel: string;
}

export default function PriceSummary({ breakdown, toolLabel }: PriceSummaryProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <div className="flex items-center justify-between py-2 px-3 bg-surface-alt rounded-lg">
                <span className="text-sm text-text-secondary">{toolLabel} Birim</span>
                <span className="text-sm font-semibold text-text-primary">
                  ₺{breakdown.adjustedBase.toFixed(2)}
                </span>
              </div>

              {breakdown.coatingDetails.map((coating) => (
                <div
                  key={coating.name}
                  className="flex items-center justify-between py-2 px-3 bg-surface-alt rounded-lg animate-fade-in"
                >
                  <span className="text-sm text-text-secondary">
                    {COATING_LABELS[coating.name as CoatingType]} Kaplama
                  </span>
                  <span className="text-sm font-semibold text-text-primary">
                    ₺{coating.surcharge.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4">
            <p className="text-xs font-semibold tracking-wider text-text-secondary uppercase mb-2">
              Toplam Fiyat
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-text-primary">
                ₺{breakdown.finalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-text-muted">TL</span>
            </div>
          </div>

          {/* Confirm */}
          <button className="w-full py-3 bg-danger hover:bg-red-600 text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-sm">
            Siparişi Onayla
          </button>

          <p className="text-xs text-text-muted text-center italic">
            * Fiyatlar güncel malzeme maliyetlerine göre hesaplanmıştır.
            Son fatura %2-3 farklılık gösterebilir.
          </p>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
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
