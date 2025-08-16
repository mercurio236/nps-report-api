export type NpsCounts = {
  promoters: number;
  passives: number;
  detractors: number;
  total: number;
};
export type NpsPct = {
  promoters: number;
  passives: number;
  detractors: number;
};
export type NpsResult = { nps: number | null; counts: NpsCounts; pct: NpsPct };

export function classify(stars: number): 'promoter' | 'passive' | 'detractor' {
  if (stars >= 4) return 'promoter';
  if (stars === 3) return 'passive';
  return 'detractor';
}

export function computeNps5(samples: number[]): NpsResult {
  let p = 0,
    m = 0,
    d = 0;
  for (const s of samples) {
    if (!Number.isFinite(s) || s < 0 || s > 5) continue;
    const c = classify(s);
    if (c === 'promoter') p++;
    else if (c === 'passive') m++;
    else d++;
  }
  const total = p + m + d;
  if (!total)
    return {
      nps: null,
      counts: { promoters: 0, passives: 0, detractors: 0, total: 0 },
      pct: { promoters: 0, passives: 0, detractors: 0 },
    };
  const promoters = +((p * 100) / total).toFixed(2);
  const passives = +((m * 100) / total).toFixed(2);
  const detractors = +((d * 100) / total).toFixed(2);
  return {
    nps: +(promoters - detractors).toFixed(2),
    counts: { promoters: p, passives: m, detractors: d, total },
    pct: { promoters, passives, detractors },
  };
}
