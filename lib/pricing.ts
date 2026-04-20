import { getCoatingPrice } from "./coating-price";

// Uç Fiyat Hesaplama Mantığı

export type ToolType = "drill" | "milling" | "reamer" | "tapping";
export type MaterialType = "hss" | "carbide" | "cobalt";
export type CoatingType =
  | "super_tin"
  | "zafir_plus"
  | "oniks"
  | "preventa"
  | "alterna"
  | "preventa_rainbow";

export const SUBTYPE_MULTIPLIERS: Record<ToolType, Record<string, number>> = {
  drill: {
    Standart: 1.0,
    Alu: 1.1,
    "Çift Zırhlı": 1.2,
    Z3: 1.5,
  },
  milling: {
    Düz: 1.0,
    Küre: 1.12,
    Chatter: 1.15,
    "Alu Z1": 1.2,
    "Alu Z2-Z3": 1.1,
    "Çok Ağızlı": 1.3,
    Kabatalaş: 1.3,
  },
  reamer: {
    Standart: 1.0,
    Alu: 1.2,
  },
  tapping: {
    Standart: 1.0,
    Alu: 1.2,
    "Çapraz diş": 1.3,
  },
};

/**
 * Admin tarafından değiştirilebilecek hammadde birim fiyatları
 */
export const HHAMMADDE_CONFIG = {
  ROD_LENGTH: 330, // Standart çubuk boyu (mm)
  DENSITY_FACTOR: 0.0145, // Yoğunluk katsayısı (Karbür için yaklaşık)
  PRICES: [
    { maxWeight: 6.0001, pricePerKg: 330 }, // 6 kg ve altı
    { maxWeight: 12, pricePerKg: 300 }, // 6 - 12 kg arası (6 dahil değil)
    { maxWeight: Infinity, pricePerKg: 280 }, // 12 kg ve üstü (12 dahil)
  ],
};

/**
 * Üretim için hammadde maliyetini hesaplayan fonksiyon.
 * Tüm hesaplar Euro (€) cinsindendir.
 */
export function calculateRawMaterialCost(
  shankDiameter: number,
  totalLength: number,
): number {
  if (!shankDiameter || !totalLength || totalLength <= 0) return 0;

  const radius = shankDiameter / 2;
  const piecesPerRod = Math.floor(HHAMMADDE_CONFIG.ROD_LENGTH / totalLength);

  // Eğer parça boyu çubuktan büyükse en az 1 parça maliyeti üzerinden devam et
  const effectivePieces = piecesPerRod > 0 ? piecesPerRod : 1;

  // 1. Gramaj Hesabı (Çubuğun toplam gramajı / içinden çıkan parça sayısı)
  const totalRodWeightGrams =
    3.14 *
    radius *
    radius *
    HHAMMADDE_CONFIG.ROD_LENGTH *
    HHAMMADDE_CONFIG.DENSITY_FACTOR;
  const weightPerToolGrams = totalRodWeightGrams / effectivePieces;

  // 2. Kilogram Hesabı (x)
  const x_kg = weightPerToolGrams / 1000;

  // 3. Fiyatlandırma (Hangi aralığa giriyorsa o birim fiyatla çarpılır)
  const config = HHAMMADDE_CONFIG.PRICES.find((p) => x_kg < p.maxWeight);
  const unitPrice = config ? config.pricePerKg : 280;

  const finalCost = x_kg * unitPrice;

  return Math.round(finalCost * 100) / 100;
}

export interface PriceParams {
  toolType: ToolType;
  material: MaterialType;
  diameter: number;
  shankDiameter: number; // Arka çap
  totalLength: number; // Tam boy
  fluteLength: number; // Helis/Kesme boyu
  coatings: CoatingType | null; // Tekli seçim
  taslama?: {
    type: "Boğaz" | "Konik";
    diameter: number;
    length: number;
  } | null;
  extraOptions?: string[]; // Polisaj vb.
  subType?: string; // e.g. "Alu", "Küre", etc.
}

export interface PriceBreakdown {
  basePrice: number;
  rawMaterialCost: number; // Hammadde maliyeti
  diameterMultiplier: number;
  adjustedBase: number;
  bilemeCost: number; // Otomatik eklenen bileme maliyeti
  coatingDetails: { name: string; surcharge: number }[];
  extraOptionDetails: { name: string; surcharge: number }[];
  totalExtraSurcharge: number;
  finalPrice: number;
}

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

// Kaplama ek ücretleri (Eski yüzde bazlı sistem - Lookup sistemine geçildi)
// Bazı özel kaplamalar veya işlemler için yedek olarak tutulabilir.
const EXTRA_SURCHARGES: Record<string, number> = {
  Polisaj: 0.1, // %10 ek ücret
};

export function calculatePrice(params: PriceParams): PriceBreakdown {
  const rawMaterialCost = calculateRawMaterialCost(
    params.shankDiameter,
    params.totalLength,
  );

  // Sadece hammadde maliyeti üzerinden hesaplama (İşçilik/Baz fiyat kaldırıldı)
  const adjustedBase = rawMaterialCost;

  const coatingDetails = params.coatings
    ? [
        {
          name: params.coatings,
          surcharge:
            getCoatingPrice(
              params.diameter,
              params.totalLength,
              params.coatings,
            ) || 0,
        },
      ]
    : [];

  const extraOptionDetails = (params.extraOptions || []).map((opt) => {
    let surcharge = 25.0; // Varsayılan sabit ücret

    // Polisaj gibi özel oranlı ekstralar
    if (opt === "Polisaj" && EXTRA_SURCHARGES["Polisaj"]) {
      surcharge =
        Math.round(adjustedBase * EXTRA_SURCHARGES["Polisaj"] * 100) / 100;
    }

    return {
      name: opt,
      surcharge,
    };
  });

  // Otomatik Bileme Hesaplaması: Ürün tipine göre farklı formüller
  let bilemeCost = 0;
  const D = params.shankDiameter;
  const L = params.fluteLength;

  switch (params.toolType) {
    case "drill":
      // Matkap: (D * L / 70) + 6
      bilemeCost = (D * L) / 70 + 6;
      break;
    case "reamer":
      // Rayba: (D * L / 60) + 15
      bilemeCost = (D * L) / 60 + 15;
      break;
    case "milling":
      // Freze: (D * L / 70) + 3
      bilemeCost = (D * L) / 70 + 3;
      break;
    case "tapping":
      // T-Freze: (D * L / 70) + 3
      bilemeCost = (D * L) / 70 + 3;
      break;
    default:
      bilemeCost = (D * L) / 70 + 3;
      break;
  }
  bilemeCost = Math.round(bilemeCost * 100) / 100;

  // Taşlama Hesaplaması
  if (params.taslama) {
    const { type, diameter: tDia, length: tLen } = params.taslama;
    const divisor = type === "Konik" ? 1.75 : 2.0;

    // Formül: (( (Tam Çap - Taşlama Çapı) / 2 )² * Taşlama Boyu) / Bölen
    const diff = (params.diameter - tDia) / 2;
    const taslamaCost = (Math.pow(diff, 2) * tLen) / divisor;

    extraOptionDetails.push({
      name: `${type} Taşlama`,
      surcharge: Math.round(taslamaCost * 100) / 100,
    });
  }

  const totalCoatingSurcharge = coatingDetails.reduce(
    (sum, c) => sum + c.surcharge,
    0,
  );
  const totalExtraSurcharge = extraOptionDetails.reduce(
    (sum, e) => sum + e.surcharge,
    0,
  );

  const multipliersForTool = SUBTYPE_MULTIPLIERS[params.toolType];
  const defaultSub = params.toolType === "milling" ? "Düz" : "Standart";
  const multiplier = multipliersForTool[params.subType || defaultSub] || 1.0;

  const finalPrice =
    Math.round(
      (adjustedBase + bilemeCost + totalCoatingSurcharge + totalExtraSurcharge) *
        multiplier *
        100,
    ) / 100;

  return {
    basePrice: 0,
    rawMaterialCost,
    diameterMultiplier: 0,
    adjustedBase: Math.round(adjustedBase * 100) / 100,
    bilemeCost,
    coatingDetails,
    extraOptionDetails,
    totalExtraSurcharge: Math.round(totalExtraSurcharge * 100) / 100,
    finalPrice,
  };
}

// Kullanıcı arayüzü için etiketler
export const TOOL_LABELS: Record<
  ToolType,
  { tr: string; en: string; desc: string }
> = {
  drill: { tr: "Matkap", en: "Drill", desc: "Hassas delik açma operasyonları" },
  milling: {
    tr: "Freze",
    en: "Milling",
    desc: "Profil ve yüzey işleme uçları",
  },
  reamer: {
    tr: "Rayba",
    en: "Reamer",
    desc: "Yüksek hassasiyetli son işlem operasyonları",
  },
  tapping: { tr: "T Freze", en: "T Freze", desc: "İç diş açma sistemleri" },
};

export const DRILL_SUBTYPES = ["Standart", "Alu", "Çift Zırhlı", "Z3"];
export const MILLING_SUBTYPES = [
  "Düz",
  "Küre",
  "Chatter",
  "Alu Z1",
  "Alu Z2-Z3",
  "Çok Ağızlı",
  "Kabatalaş",
];
export const REAMER_SUBTYPES = ["Standart", "Alu"];
export const TAPPING_SUBTYPES = ["Standart", "Alu", "Çapraz diş"];
export const DRILL_EXTRAS = ["Polisaj"];
export const MILLING_EXTRAS = ["Polisaj"];

export const MATERIAL_LABELS: Record<MaterialType, string> = {
  hss: "Yüksek Hız Çeliği (HSS)",
  carbide: "Karbür",
  cobalt: "Kobalt",
};

export const COATING_LABELS: Record<CoatingType, string> = {
  super_tin: "Super TiN",
  zafir_plus: "Zafir Plus",
  oniks: "Oniks",
  preventa: "Preventa",
  alterna: "Alterna",
  preventa_rainbow: "Preventa Rainbow",
};
