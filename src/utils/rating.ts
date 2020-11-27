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
    return Math.ceil((left + right) / 2.0);
}

export function getRatingName(rating: number) {
    if (rating >= 3000) {
        return 'Legendary Grandmaster';
    } else if (rating >= 2600) {
        return 'International Grandmaster';
    } else if (rating >= 2400) {
        return 'Grandmaster';
    } else if (rating >= 2300) {
        return 'International Master';
    } else if (rating >= 2100) {
        return 'Master';
    } else if (rating >= 1900) {
        return 'Candidate Master';
    } else if (rating >= 1600) {
        return 'Expert';
    } else if (rating >= 1400) {
        return 'Specialist';
    } else if (rating >= 1200) {
        return 'Pupil';
    } else {
        return 'Newbie';
    }
}
