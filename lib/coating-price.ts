export const COATING_PRICES = {
  currency: "EUR",
  discount: -10,
  coatings: [
    "zafir_plus",
    "oniks",
    "preventa",
    "alterna",
    "preventa_rainbow",
  ],
  data: [
    {
      diameter: [2.0, 3.9],
      lengths: [
        { range: [0, 35], prices: [0.53, 0.66, 0.66, 0.66, 0.0] },
        { range: [35.01, 100], prices: [1.04, 1.3, 1.3, 1.3, 1.46] },
        { range: [101, 150], prices: [1.3, 1.63, 1.63, 1.63, 1.83] },
        { range: [151, 200], prices: [1.83, 2.28, 2.28, 2.28, 2.55] },
      ],
    },
    {
      diameter: [4.0, 5.9],
      lengths: [
        { range: [0, 35], prices: [0.53, 0.66, 0.66, 0.66, 0.0] },
        { range: [35.01, 100], prices: [1.04, 1.3, 1.3, 1.3, 1.46] },
        { range: [101, 150], prices: [1.3, 1.63, 1.63, 1.63, 1.83] },
        { range: [151, 200], prices: [1.83, 2.28, 2.28, 2.28, 2.55] },
      ],
    },
    {
      diameter: [6.0, 7.9],
      lengths: [
        { range: [0, 35], prices: [0.53, 0.66, 0.66, 0.66, 0.0] },
        { range: [35.01, 100], prices: [1.04, 1.3, 1.3, 1.3, 1.46] },
        { range: [101, 150], prices: [1.3, 1.63, 1.63, 1.63, 1.83] },
        { range: [151, 200], prices: [1.83, 2.28, 2.28, 2.28, 2.55] },
      ],
    },
    {
      diameter: [8.0, 9.9],
      lengths: [
        { range: [0, 35], prices: [0.63, 0.78, 0.78, 0.78, 0.0] },
        { range: [35.01, 100], prices: [1.25, 1.57, 1.57, 1.57, 1.75] },
        { range: [101, 150], prices: [1.57, 1.96, 1.96, 1.96, 2.19] },
        { range: [151, 200], prices: [2.19, 2.74, 2.74, 2.74, 3.07] },
      ],
    },
    {
      diameter: [10.0, 11.9],
      lengths: [
        { range: [0, 35], prices: [0.7, 0.87, 0.87, 0.87, 0.0] },
        { range: [35.01, 100], prices: [1.39, 1.74, 1.74, 1.74, 1.95] },
        { range: [101, 150], prices: [1.74, 2.17, 2.17, 2.17, 2.43] },
        { range: [151, 200], prices: [2.44, 3.04, 3.04, 3.04, 3.41] },
      ],
    },
    {
      diameter: [12.0, 15.9],
      lengths: [
        { range: [0, 35], prices: [0.88, 1.09, 1.09, 1.09, 0.0] },
        { range: [35.01, 100], prices: [1.75, 2.18, 2.18, 2.18, 2.44] },
        { range: [101, 150], prices: [2.18, 2.73, 2.73, 2.73, 3.06] },
        { range: [151, 200], prices: [3.05, 3.82, 3.82, 3.82, 4.28] },
      ],
    },
    {
      diameter: [16.0, 19.9],
      lengths: [
        { range: [0, 35], prices: [1.4, 1.74, 1.74, 1.74, 0.0] },
        { range: [35.01, 100], prices: [2.78, 3.48, 3.48, 3.48, 3.89] },
        { range: [101, 150], prices: [3.48, 4.35, 4.35, 4.35, 4.87] },
        { range: [151, 200], prices: [4.87, 6.09, 6.09, 6.09, 6.82] },
      ],
    },
    {
      diameter: [20.0, 24.9],
      lengths: [
        { range: [0, 35], prices: [1.91, 2.4, 2.4, 2.4, 0.0] },
        { range: [35.01, 100], prices: [3.83, 4.78, 4.78, 4.78, 5.36] },
        { range: [101, 150], prices: [4.78, 5.98, 5.98, 5.98, 7.59] },
        { range: [151, 200], prices: [6.7, 8.37, 8.37, 8.37, 9.37] },
      ],
    },
    {
      diameter: [25.0, 31.9],
      lengths: [
        { range: [0, 35], prices: [2.44, 3.05, 3.05, 3.05, 0.0] },
        { range: [35.01, 100], prices: [4.87, 6.09, 6.09, 6.09, 6.82] },
        { range: [101, 150], prices: [6.09, 7.61, 7.61, 7.61, 8.53] },
        { range: [151, 200], prices: [8.52, 10.65, 10.65, 10.65, 11.94] },
      ],
    },
    {
      diameter: [32.0, 35.9],
      lengths: [
        { range: [0, 35], prices: [3.14, 3.92, 3.92, 3.92, 0.0] },
        { range: [36, 100], prices: [6.26, 7.83, 7.83, 7.83, 8.77] },
        { range: [101, 150], prices: [7.83, 9.78, 9.78, 9.78, 10.96] },
        { range: [151, 200], prices: [10.96, 13.7, 13.7, 13.7, 15.35] },
      ],
    },
  ],
};

export function getCoatingPrice(
  diameter: number,
  length: number,
  coatingKey: string,
  dynamicConfig?: any, // FullPricingConfig.coatings
) {
  const config = dynamicConfig || COATING_PRICES;
  
  const d = config.data.find(
    (row: any) => diameter >= row.diameter[0] && diameter <= row.diameter[1],
  );

  if (!d) return null;

  const l = d.lengths.find((row: any) => length >= row.range[0] && length <= row.range[1]);

  if (!l) return null;

  const index = config.coatings?.indexOf(coatingKey) ?? config.types?.indexOf(coatingKey);
  if (index === -1 || index === undefined) return null;

  return l.prices[index];
}
