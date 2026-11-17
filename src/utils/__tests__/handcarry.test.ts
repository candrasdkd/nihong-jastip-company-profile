import { billedWeight, estimateHandcarry } from '../handcarry';

describe('billedWeight', () => {
  it('minimum 1 kg', () => {
    expect(billedWeight(0.3)).toBe(1);
    expect(billedWeight(1)).toBe(1);
  });
  it('dibulatkan ke atas per 0,5 kg', () => {
    expect(billedWeight(1.1)).toBe(1.5);
    expect(billedWeight(2.5)).toBe(2.5);
    expect(billedWeight(2.51)).toBe(3);
    expect(billedWeight(4.2)).toBe(4.5);
  });
});

describe('estimateHandcarry', () => {
  it('Jepang → Indonesia 2,3 kg = 2,5 kg × 1300–1700', () => {
    const e = estimateHandcarry(2.3, 'japan_to_id')!;
    expect(e.billedKg).toBe(2.5);
    expect(e.totalMin).toBe(3250);
    expect(e.totalMax).toBe(4250);
  });
  it('Indonesia → Jepang 3 kg = 3 kg × 1100–1500', () => {
    const e = estimateHandcarry(3, 'id_to_japan')!;
    expect(e.totalMin).toBe(3300);
    expect(e.totalMax).toBe(4500);
  });
  it('input tidak valid → null', () => {
    expect(estimateHandcarry(0, 'japan_to_id')).toBeNull();
    expect(estimateHandcarry(-2, 'japan_to_id')).toBeNull();
    expect(estimateHandcarry(NaN, 'japan_to_id')).toBeNull();
    // @ts-expect-error arah tidak dikenal
    expect(estimateHandcarry(2, 'mars')).toBeNull();
  });
});
