import { describe, expect, it } from "vitest";

import { getStarFillStates, StarFill } from "../../src/utils";

const roundingCases = [
  {
    rating: 3.24,
    expected: [
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.EMPTY,
      StarFill.EMPTY,
    ],
  },
  {
    rating: 3.25,
    expected: [
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.HALF,
      StarFill.EMPTY,
    ],
  },
  {
    rating: 3.74,
    expected: [
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.HALF,
      StarFill.EMPTY,
    ],
  },
  {
    rating: 3.75,
    expected: [
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.EMPTY,
    ],
  },
  {
    rating: 4.75,
    expected: [
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
      StarFill.FULL,
    ],
  },
];

describe("getStarFillStates rounding", () => {
  it.each(roundingCases)(
    "rounds rating $rating to the expected stars",
    ({ rating, expected }) => {
      expect(getStarFillStates(rating, 5)).toEqual(expected);
    },
  );
});
