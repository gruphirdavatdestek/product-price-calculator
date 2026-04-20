export const COATING_PRICES = {
  currency: "EUR",
  discount: -10,
  coatings: [
    "super_tin",
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
        { range: [0, 35], prices: [0.45, 0.53, 0.66, 0.66, 0.66, 0.0] },
        { range: [35.01, 100], prices: [0.89, 1.04, 1.3, 1.3, 1.3, 1.46] },
        { range: [101, 150], prices: [1.11, 1.3, 1.63, 1.63, 1.63, 1.83] },
        { range: [151, 200], prices: [1.55, 1.83, 2.28, 2.28, 2.28, 2.55] },
      ],
    },
    {
      diameter: [4.0, 5.9],
      lengths: [
        { range: [0, 35], prices: [0.45, 0.53, 0.66, 0.66, 0.66, 0.0] },
        { range: [35.01, 100], prices: [0.89, 1.04, 1.3, 1.3, 1.3, 1.46] },
        { range: [101, 150], prices: [1.11, 1.3, 1.63, 1.63, 1.63, 1.83] },
        { range: [151, 200], prices: [1.55, 1.83, 2.28, 2.28, 2.28, 2.55] },
      ],
    },
    {
      diameter: [6.0, 7.9],
      lengths: [
        { range: [0, 35], prices: [0.45, 0.53, 0.66, 0.66, 0.66, 0.0] },
        { range: [35.01, 100], prices: [0.89, 1.04, 1.3, 1.3, 1.3, 1.46] },
        { range: [101, 150], prices: [1.11, 1.3, 1.63, 1.63, 1.63, 1.83] },
        { range: [151, 200], prices: [1.55, 1.83, 2.28, 2.28, 2.28, 2.55] },
      ],
    },
    {
      diameter: [8.0, 9.9],
      lengths: [
        { range: [0, 35], prices: [0.54, 0.63, 0.78, 0.78, 0.78, 0.0] },
        { range: [35.01, 100], prices: [1.06, 1.25, 1.57, 1.57, 1.57, 1.75] },
        { range: [101, 150], prices: [1.33, 1.57, 1.96, 1.96, 1.96, 2.19] },
        { range: [151, 200], prices: [1.86, 2.19, 2.74, 2.74, 2.74, 3.07] },
      ],
    },
    {
      diameter: [10.0, 11.9],
      lengths: [
        { range: [0, 35], prices: [0.59, 0.7, 0.87, 0.87, 0.87, 0.0] },
        { range: [35.01, 100], prices: [1.18, 1.39, 1.74, 1.74, 1.74, 1.95] },
        { range: [101, 150], prices: [1.48, 1.74, 2.17, 2.17, 2.17, 2.43] },
        { range: [151, 200], prices: [2.07, 2.44, 3.04, 3.04, 3.04, 3.41] },
      ],
    },
    {
      diameter: [12.0, 15.9],
      lengths: [
        { range: [0, 35], prices: [0.75, 0.88, 1.09, 1.09, 1.09, 0.0] },
        { range: [35.01, 100], prices: [1.48, 1.75, 2.18, 2.18, 2.18, 2.44] },
        { range: [101, 150], prices: [1.85, 2.18, 2.73, 2.73, 2.73, 3.06] },
        { range: [151, 200], prices: [2.6, 3.05, 3.82, 3.82, 3.82, 4.28] },
      ],
    },
    {
      diameter: [16.0, 19.9],
      lengths: [
        { range: [0, 35], prices: [1.19, 1.4, 1.74, 1.74, 1.74, 0.0] },
        { range: [35.01, 100], prices: [2.37, 2.78, 3.48, 3.48, 3.48, 3.89] },
        { range: [101, 150], prices: [2.96, 3.48, 4.35, 4.35, 4.35, 4.87] },
        { range: [151, 200], prices: [4.14, 4.87, 6.09, 6.09, 6.09, 6.82] },
      ],
    },
    {
      diameter: [20.0, 24.9],
      lengths: [
        { range: [0, 35], prices: [1.63, 1.91, 2.4, 2.4, 2.4, 0.0] },
        { range: [35.01, 100], prices: [3.25, 3.83, 4.78, 4.78, 4.78, 5.36] },
        { range: [101, 150], prices: [4.07, 4.78, 5.98, 5.98, 5.98, 7.59] },
        { range: [151, 200], prices: [5.69, 6.7, 8.37, 8.37, 8.37, 9.37] },
      ],
    },
    {
      diameter: [25.0, 31.9],
      lengths: [
        { range: [0, 35], prices: [2.07, 2.44, 3.05, 3.05, 3.05, 0.0] },
        { range: [35.01, 100], prices: [4.14, 4.87, 6.09, 6.09, 6.09, 6.82] },
        { range: [101, 150], prices: [5.17, 6.09, 7.61, 7.61, 7.61, 8.53] },
        { range: [151, 200], prices: [7.24, 8.52, 10.65, 10.65, 10.65, 11.94] },
      ],
    },
    {
      diameter: [32.0, 35.9],
      lengths: [
        { range: [0, 35], prices: [2.66, 3.14, 3.92, 3.92, 3.92, 0.0] },
        { range: [36, 100], prices: [5.32, 6.26, 7.83, 7.83, 7.83, 8.77] },
        { range: [101, 150], prices: [6.65, 7.83, 9.78, 9.78, 9.78, 10.96] },
        { range: [151, 200], prices: [9.31, 10.96, 13.7, 13.7, 13.7, 15.35] },
      ],
    },
  ],
};

export function getCoatingPrice(
  diameter: number,
  length: number,
  coatingKey: string,
) {
  const d = COATING_PRICES.data.find(
    (d) => diameter >= d.diameter[0] && diameter <= d.diameter[1],
  );

  if (!d) return null;

  const l = d.lengths.find((l) => length >= l.range[0] && length <= l.range[1]);

  if (!l) return null;

  const index = COATING_PRICES.coatings.indexOf(coatingKey);
  if (index === -1) return null;

  return l.prices[index];
}
