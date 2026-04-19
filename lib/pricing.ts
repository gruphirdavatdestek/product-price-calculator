// Uç Fiyat Hesaplama Mantığı

export type ToolType = "drill" | "milling" | "reamer" | "tapping";
export type MaterialType = "hss" | "carbide" | "cobalt";
export type CoatingType = "TiN" | "TiAlN" | "Diamond" | "AlCrN";

// Ürün tipi bazında temel fiyatlar (TL)
const BASE_PRICES: Record<ToolType, Record<MaterialType, number>> = {
  drill: { hss: 120, carbide: 350, cobalt: 220 },
  milling: { hss: 180, carbide: 520, cobalt: 310 },
  reamer: { hss: 200, carbide: 580, cobalt: 340 },
  tapping: { hss: 150, carbide: 420, cobalt: 260 },
};

// Çap çarpanları (mm → fiyat çarpanı)
function getDiameterMultiplier(diameter: number): number {
  if (diameter <= 3) return 0.8;
  if (diameter <= 6) return 1.0;
  if (diameter <= 10) return 1.3;
  if (diameter <= 16) return 1.6;
  if (diameter <= 25) return 2.0;
  return 2.5;
}

// Kaplama ek ücret yüzdeleri
const COATING_SURCHARGES: Record<CoatingType, number> = {
  TiN: 0.15, // +%15
  TiAlN: 0.25, // +%25
  Diamond: 0.4, // +%40
  AlCrN: 0.2, // +%20
};

export interface PriceParams {
  toolType: ToolType;
  material: MaterialType;
  diameter: number;
  coatings: CoatingType[];
}

export interface PriceBreakdown {
  basePrice: number;
  diameterMultiplier: number;
  adjustedBase: number;
  coatingDetails: { name: CoatingType; surcharge: number }[];
  totalCoatingSurcharge: number;
  finalPrice: number;
}

export function calculatePrice(params: PriceParams): PriceBreakdown {
  const basePrice = BASE_PRICES[params.toolType][params.material];
  const diameterMultiplier = getDiameterMultiplier(params.diameter);
  const adjustedBase = basePrice * diameterMultiplier;

  const coatingDetails = params.coatings.map((coating) => ({
    name: coating,
    surcharge: Math.round(adjustedBase * COATING_SURCHARGES[coating] * 100) / 100,
  }));

  const totalCoatingSurcharge = coatingDetails.reduce(
    (sum, c) => sum + c.surcharge,
    0
  );

  const finalPrice = Math.round((adjustedBase + totalCoatingSurcharge) * 100) / 100;

  return {
    basePrice,
    diameterMultiplier,
    adjustedBase: Math.round(adjustedBase * 100) / 100,
    coatingDetails,
    totalCoatingSurcharge: Math.round(totalCoatingSurcharge * 100) / 100,
    finalPrice,
  };
}

// Kullanıcı arayüzü için etiketler
export const TOOL_LABELS: Record<ToolType, { tr: string; en: string; desc: string }> = {
  drill: { tr: "Matkap", en: "Drill", desc: "Hassas delik açma operasyonları" },
  milling: { tr: "Freze", en: "Milling", desc: "Profil ve yüzey işleme uçları" },
  reamer: { tr: "Rayba", en: "Reamer", desc: "Yüksek hassasiyetli son işlem operasyonları" },
  tapping: { tr: "Kılavuz", en: "Tapping", desc: "İç diş açma sistemleri" },
};

export const MATERIAL_LABELS: Record<MaterialType, string> = {
  hss: "Yüksek Hız Çeliği (HSS)",
  carbide: "Karbür",
  cobalt: "Kobalt",
};

export const COATING_LABELS: Record<CoatingType, string> = {
  TiN: "TiN",
  TiAlN: "TiAlN",
  Diamond: "Diamond",
  AlCrN: "AlCrN",
};
