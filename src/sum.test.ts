import { describe, expect, it } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('return correct vales', () => {
    expect(sum(1, 2)).toBe(3);
  });
  it('return uncorrect vales', () => {
    expect(sum(-1, 3)).toBe(2);
  });
});
