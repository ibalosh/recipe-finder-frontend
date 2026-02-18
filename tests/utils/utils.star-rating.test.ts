import { describe, expect, it } from "vitest";

import { getStarFillStates, StarFill } from "../../src/utils";

describe("getStarFillStates", () => {
  it("creates exactly maxRating stars", () => {
    expect(getStarFillStates(3, 5)).toHaveLength(5);
    expect(getStarFillStates(7, 10)).toHaveLength(10);
    expect(getStarFillStates(0, 1)).toHaveLength(1);
  });

  it("returns only EMPTY stars for rating 0", () => {
    expect(getStarFillStates(0, 5)).toEqual([
      StarFill.EMPTY,
      StarFill.EMPTY,
      StarFill.EMPTY,
      StarFill.EMPTY,
      StarFill.EMPTY,
    ]);
  });

  it("returns only FULL stars when rating equals maxRating", () => {
    expect(getStarFillStates(5, 5)).toEqual([
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
    ]);
  });

  it("returns only FULL stars when rating is above maxRating", () => {
    expect(getStarFillStates(8, 5)).toEqual([
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
    ]);
  });

  it("returns only EMPTY stars for negative ratings", () => {
    expect(getStarFillStates(-1, 5)).toEqual([
      StarFill.EMPTY,
      StarFill.EMPTY,
      StarFill.EMPTY,
      StarFill.EMPTY,
      StarFill.EMPTY,
    ]);
  });

  it("handles integer ratings without HALF stars", () => {
    expect(getStarFillStates(3, 5)).toEqual([
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.EMPTY,
      StarFill.EMPTY,
    ]);
  });

  it("handles half ratings with a single HALF star", () => {
    expect(getStarFillStates(2.5, 5)).toEqual([
      StarFill.FULL,
      StarFill.FULL,
      StarFill.HALF,
      StarFill.EMPTY,
      StarFill.EMPTY,
    ]);
  });

  it("supports maxRating other than 5", () => {
    expect(getStarFillStates(7.5, 10)).toEqual([
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.HALF,
      StarFill.EMPTY,
      StarFill.EMPTY,
    ]);
  });
});
