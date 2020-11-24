function getWinProbability(ra: number, rb: number) {
    return 1.0 / (1.0 + Math.pow(10.0, (rb - ra) / 400.0));
}

export function getTeamRating(teamRatings: number[]): number {
    let left = 1;
    let right = 1e4;
    for (let tt = 0; tt < 100; ++tt) {
        let r = (left + right) / 2.0;
        let rWinsProbability = 1.0;
        teamRatings.forEach(rating => {
            rWinsProbability *= getWinProbability(r, rating);
        });
        let rating = Math.log10(1 / rWinsProbability - 1) * 400 + r;
        if (rating > r) {
            left = r;
        } else {
            right = r;
        }
    }
    return Math.floor((left + right) / 2.0);
}
