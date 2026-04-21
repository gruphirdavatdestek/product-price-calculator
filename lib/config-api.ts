import { createClient } from "./supabase/client";
import { type ToolType } from "./pricing";

/**
 * Dinamik Fiyatlandırma Konfigürasyon Tipleri
 */

export interface SubtypeMultipliers {
  [tool: string]: { [subtype: string]: number };
}

export interface HammaddeTier {
  maxWeight: number;
  pricePerKg: number;
}

export interface HammaddeConfig {
  ROD_LENGTH: number;
  DENSITY_FACTOR: number;
  PRICES: HammaddeTier[];
}

export interface SalesConfig {
  min_multiplier: number;
  cash_multiplier: number;
  credit_multiplier: number;
}

export interface CoatingLengthRange {
  range: [number, number];
  prices: number[];
}

export interface CoatingDataRow {
  diameter: [number, number];
  lengths: CoatingLengthRange[];
}

export interface CoatingConfig {
  types: string[];
  data: CoatingDataRow[];
}

export interface FullPricingConfig {
  multipliers: SubtypeMultipliers;
  hammadde: HammaddeConfig;
  sales: SalesConfig;
  coatings: CoatingConfig;
}

/**
 * Veritabanından konfigürasyon çekme ve güncelleme işlemleri
 */

export async function fetchPricingConfig(): Promise<FullPricingConfig | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pricing_config")
      .select("*");

    if (error) throw error;

    // Tablo satırlarını birleştirerek FullPricingConfig nesnesine çevir
    const config: any = {};
    data.forEach((row) => {
      config[row.key] = row.value;
    });

    return config as FullPricingConfig;
  } catch (err) {
    console.error("Config çekme hatası:", err);
    return null;
  }
}

export async function updateConfigItem(key: string, value: any) {
  const supabase = createClient();
  const { error } = await supabase
    .from("pricing_config")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) throw error;
  return true;
}
