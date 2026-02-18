export enum StarFill {
    FULL,
    HALF,
    EMPTY
}

export function getStarFillStates(rating: number, maxRating: number) {
    const roundedStarsRating = Math.round(rating * 2) / 2; // e.g. 3.89 → 4.0, 3.25 → 3.5

    const totalStarsCount = maxRating;
    const fullStarsCount = Math.floor(roundedStarsRating);
    const hasHalfStar = roundedStarsRating % 1 !== 0;  // true if there's a half star

    const stars: StarFill[] = Array(totalStarsCount).fill(null).map((_, i: number) => {
        if (i < fullStarsCount) {
            return StarFill.FULL
        } else if (i === fullStarsCount && hasHalfStar) {
            return StarFill.HALF
        } else {
            return StarFill.EMPTY
        }
    })

    return stars;
}
