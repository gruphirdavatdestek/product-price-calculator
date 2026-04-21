"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/auth-utils";
import { fetchPricingConfig, updateConfigItem, type FullPricingConfig } from "@/lib/config-api";
import { COATING_PRICES } from "@/lib/coating-price";

const DEFAULT_CONFIG: FullPricingConfig = {
  multipliers: {
    drill: { Standart: 1.0, Alu: 1.1, "Çift Zırhlı": 1.2, Z3: 1.5 },
    milling: {
      Düz: 1.0,
      Küre: 1.12,
      Chatter: 1.15,
      "Alu Z1": 1.2,
      "Alu Z2-Z3": 1.1,
      "Çok Ağızlı": 1.3,
      Kabatalaş: 1.3,
    },
    reamer: { Standart: 1.0, Alu: 1.2 },
    tapping: { Standart: 1.0, Alu: 1.2, "Çapraz diş": 1.3 },
  },
  hammadde: {
    ROD_LENGTH: 330,
    DENSITY_FACTOR: 0.0145,
    PRICES: [
      { maxWeight: 6.0001, pricePerKg: 330 },
      { maxWeight: 12, pricePerKg: 300 },
      { maxWeight: 1000000, pricePerKg: 280 },
    ],
  },
  sales: {
    min_multiplier: 1.2,
    cash_multiplier: 1.4,
    credit_multiplier: 1.8,
  },
  coatings: {
    types: COATING_PRICES.coatings,
    data: COATING_PRICES.data as any
  }
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "multipliers" | "hammadde" | "sales" | "coatings"
  >("multipliers");
  const [config, setConfig] = useState<FullPricingConfig>(DEFAULT_CONFIG);
  
  // Matrix editor selection
  const [selectedDiaIdx, setSelectedDiaIdx] = useState(0);
  const [selectedLenIdx, setSelectedLenIdx] = useState(0);

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (!isAdmin(data.user?.email)) {
        router.push("/dashboard");
        return;
      }

      const remoteConfig = await fetchPricingConfig();
      if (remoteConfig) {
        // Deep merge with defaults to ensure all keys exist
        setConfig({
          multipliers: { ...DEFAULT_CONFIG.multipliers, ...remoteConfig.multipliers },
          hammadde: { ...DEFAULT_CONFIG.hammadde, ...remoteConfig.hammadde },
          sales: { ...DEFAULT_CONFIG.sales, ...remoteConfig.sales },
          coatings: { ...DEFAULT_CONFIG.coatings, ...remoteConfig.coatings },
        });
      }
      setLoading(false);
    }
    init();
  }, [router]);

  const handleSave = async (key: string, value: any) => {
    setSaving(true);
    try {
      await updateConfigItem(key, value);
      const updated = await fetchPricingConfig();
      if (updated) {
        setConfig((prev) => ({
          ...prev,
          [key]: updated[key as keyof FullPricingConfig],
        }));
      }
      alert("Ayarlar başarıyla kaydedildi!");
    } catch (err) {
      console.error(err);
      alert("Kaydedilirken bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Defensiveness: Ensure inner properties exist
  const currentConfig = {
    multipliers: config.multipliers || DEFAULT_CONFIG.multipliers,
    hammadde: config.hammadde || DEFAULT_CONFIG.hammadde,
    sales: config.sales || DEFAULT_CONFIG.sales,
    coatings: config.coatings || DEFAULT_CONFIG.coatings,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Yönetici Paneli</h1>
          <p className="text-slate-500 mt-1">Fiyatlandırma katsayıları ve teknik parametreleri buradan yönetebilirsiniz.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("multipliers")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "multipliers" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Katsayılar
          </button>
          <button
            onClick={() => setActiveTab("hammadde")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "hammadde" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Hammadde
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "sales" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Satış Oranları
          </button>
          <button
            onClick={() => setActiveTab("coatings")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "coatings" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Kaplamalar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 overflow-hidden relative">
        {saving && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-xl border border-slate-100">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="font-bold text-slate-700">Güncelleniyor...</span>
            </div>
          </div>
        )}

        {/* Tab: Multipliers */}
        {activeTab === "multipliers" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {Object.entries(currentConfig.multipliers).map(([tool, subtypes]) => (
              <div key={tool} className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <h3 className="text-lg font-bold text-slate-800 capitalize">
                    {tool === "drill" ? "Matkap" : tool === "milling" ? "Freze" : tool === "reamer" ? "Rayba" : "T-Freze"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(subtypes).map(([sub, val]) => (
                    <div key={sub} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:border-slate-200 transition-colors">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">{sub}</label>
                      <input
                        type="number"
                        step="0.01"
                        value={val}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setConfig((prev) => ({
                            ...prev,
                            multipliers: {
                              ...prev.multipliers,
                              [tool]: {
                                ...prev.multipliers[tool],
                                [sub]: val
                              }
                            }
                          }));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => handleSave("multipliers", config.multipliers)}
              className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Katsayı Değişikliklerini Kaydet
            </button>
          </div>
        )}

        {/* Tab: Hammadde */}
        {activeTab === "hammadde" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-600 block px-1">Çubuk Boyu (mm)</label>
                <input
                  type="number"
                  value={currentConfig.hammadde.ROD_LENGTH}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setConfig((prev) => ({
                      ...prev,
                      hammadde: { ...prev.hammadde, ROD_LENGTH: val }
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-600 block px-1">Yoğunluk Katsayısı</label>
                <input
                  type="number"
                  step="0.0001"
                  value={currentConfig.hammadde.DENSITY_FACTOR}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setConfig((prev) => ({
                      ...prev,
                      hammadde: { ...prev.hammadde, DENSITY_FACTOR: val }
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Ağırlık Bazlı Fiyat Tiers (€/kg)</h3>
              <div className="space-y-3">
                {currentConfig.hammadde.PRICES.map((tier, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-end gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex-1 w-full sm:w-auto">
                      <label className="text-xs font-bold text-slate-500 block mb-1">MAX AĞIRLIK (KG)</label>
                      <input
                        type="number"
                        value={tier.maxWeight === 1000000 ? "" : tier.maxWeight}
                        placeholder={tier.maxWeight === 1000000 ? "∞ (Sınırsız)" : ""}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 1000000;
                          setConfig((prev) => {
                            const newPrices = [...prev.hammadde.PRICES];
                            newPrices[idx] = { ...newPrices[idx], maxWeight: val };
                            return { ...prev, hammadde: { ...prev.hammadde, PRICES: newPrices } };
                          });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                      />
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <label className="text-xs font-bold text-slate-500 block mb-1">KG BAŞI FİYAT (€)</label>
                      <input
                        type="number"
                        value={tier.pricePerKg}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setConfig((prev) => {
                            const newPrices = [...prev.hammadde.PRICES];
                            newPrices[idx] = { ...newPrices[idx], pricePerKg: val };
                            return { ...prev, hammadde: { ...prev.hammadde, PRICES: newPrices } };
                          });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleSave("hammadde", config.hammadde)}
              className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Hammadde Ayarlarını Kaydet
            </button>
          </div>
        )}

        {/* Tab: Sales */}
        {activeTab === "sales" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">Min. Satış Çarpanı</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-700">x</span>
                  <input
                    type="number"
                    step="0.1"
                    value={currentConfig.sales.min_multiplier}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setConfig((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, min_multiplier: val }
                      }));
                    }}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xl font-bold text-primary outline-none focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                <label className="block text-xs font-black text-green-600/60 mb-3 uppercase tracking-widest">Peşin Satış Çarpanı</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-green-700">x</span>
                  <input
                    type="number"
                    step="0.1"
                    value={currentConfig.sales.cash_multiplier}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setConfig((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, cash_multiplier: val }
                      }));
                    }}
                    className="w-full bg-white border-green-200 rounded-2xl px-4 py-3 text-xl font-bold text-green-700 outline-none focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <label className="block text-xs font-black text-blue-600/60 mb-3 uppercase tracking-widest">Vadeli Satış Çarpanı</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-700">x</span>
                  <input
                    type="number"
                    step="0.1"
                    value={currentConfig.sales.credit_multiplier}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setConfig((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, credit_multiplier: val }
                      }));
                    }}
                    className="w-full bg-white border-blue-200 rounded-2xl px-4 py-3 text-xl font-bold text-blue-700 outline-none focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleSave("sales", config.sales)}
              className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Satış Oranlarını Kaydet
            </button>
          </div>
        )}

        {/* Tab: Coatings */}
        {activeTab === "coatings" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Coating Type Manager */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Kaplama Türleri</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentConfig.coatings.types.map((type, idx) => (
                  <div key={type} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-sm font-semibold text-slate-700">{type}</span>
                    <button 
                      onClick={async () => {
                        if (!confirm(`${type} kaplamasını silmek istediğinize emin misiniz?`)) return;
                        const newTypes = currentConfig.coatings.types.filter((_, i) => i !== idx);
                        const newData = currentConfig.coatings.data.map(row => ({
                          ...row,
                          lengths: row.lengths.map(l => ({
                            ...l,
                            prices: l.prices.filter((_, i) => i !== idx)
                          }))
                        }));
                        const newCoatingConfig = { types: newTypes, data: newData };
                        // Perform immediate save
                        await handleSave("coatings", newCoatingConfig);
                      }}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  id="new-coating-input"
                  type="text" 
                  placeholder="Yeni kaplama ismi..."
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button 
                  onClick={async () => {
                    const input = document.getElementById("new-coating-input") as HTMLInputElement;
                    const name = input.value.trim().toLowerCase().replace(/\s+/g, '_');
                    if (!name) return;
                    if (currentConfig.coatings.types.includes(name)) {
                      alert("Bu kaplama zaten mevcut!");
                      return;
                    }
                    const newTypes = [...currentConfig.coatings.types, name];
                    const newData = currentConfig.coatings.data.map(row => ({
                      ...row,
                      lengths: row.lengths.map(l => ({
                        ...l,
                        prices: [...l.prices, 0]
                      }))
                    }));
                    const newCoatingConfig = { types: newTypes, data: newData };
                    // Perform immediate save
                    await handleSave("coatings", newCoatingConfig);
                    input.value = "";
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Ekle
                </button>
              </div>
            </div>

            {/* Matrix Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Diameter Selection */}
              <div className="lg:col-span-1 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Çap Aralığı (mm)</label>
                <div className="space-y-1">
                    {currentConfig.coatings.data.map((row, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDiaIdx(idx);
                        setSelectedLenIdx(0);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedDiaIdx === idx ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                    >
                      {row.diameter[0]} - {row.diameter[1]} mm
                    </button>
                  ))}
                </div>
              </div>

              {/* Length & Price Editor */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex flex-col gap-6">
                  {/* Length Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
                    {currentConfig.coatings.data[selectedDiaIdx].lengths.map((len, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedLenIdx(idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedLenIdx === idx ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                      >
                        {len.range[0]} - {len.range[1]} mm
                      </button>
                    ))}
                  </div>

                  {/* Price Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentConfig.coatings.types.map((type, typeIdx) => (
                      <div key={type} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group transition-all hover:border-primary/20 hover:bg-white hover:shadow-md relative">
                        <div className="flex justify-between items-start mb-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide group-hover:text-primary transition-colors">{type.replace('_', ' ')}</label>
                          <button 
                            title="Bu fiyatı TÜM çap ve boy aralıklarına uygula"
                            onClick={() => {
                              const currentPrice = currentConfig.coatings.data[selectedDiaIdx].lengths[selectedLenIdx].prices[typeIdx];
                              if (!confirm(`Bu kaplama için girdiğiniz '${currentPrice}' fiyatını diğer tüm 40 aralığa da kopyalamak istediğinize emin misiniz?`)) return;
                              
                              const newData = currentConfig.coatings.data.map(row => ({
                                ...row,
                                lengths: row.lengths.map(l => {
                                  const newPrices = [...l.prices];
                                  newPrices[typeIdx] = currentPrice;
                                  return { ...l, prices: newPrices };
                                })
                              }));
                              setConfig(prev => ({ ...prev, coatings: { ...prev.coatings, data: newData } }));
                            }}
                            className="p-1 hover:bg-primary/10 rounded-lg text-slate-300 hover:text-primary transition-all"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 7h10v10M7 17L17 7"/></svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-300">€</span>
                          <input
                            type="number"
                            step="0.01"
                            value={currentConfig.coatings.data[selectedDiaIdx].lengths[selectedLenIdx].prices[typeIdx]}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setConfig((prev) => {
                                const newData = [...prev.coatings.data];
                                const newPrices = [...newData[selectedDiaIdx].lengths[selectedLenIdx].prices];
                                newPrices[typeIdx] = val;
                                newData[selectedDiaIdx].lengths[selectedLenIdx].prices = newPrices;
                                return { ...prev, coatings: { ...prev.coatings, data: newData } };
                              });
                            }}
                            className="w-full bg-transparent border-none p-0 text-lg font-bold text-slate-800 outline-none placeholder:text-slate-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSave("coatings", config.coatings)}
              className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Kaplama Fiyatlarını Kaydet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
