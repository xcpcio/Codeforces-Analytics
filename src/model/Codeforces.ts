import { request } from '@/utils/request';
import { host } from '@/model';

export interface UserInfo {
    lastName?: string;
    country?: string;
    lastOnlineTimeSeconds?: number;
    city?: string;
    rating?: number;
    friendOfCount?: number;
    titlePhoto?: string;
    handle: string;
    avatar: string;
    firstName?: string;
    contribution: number;
    organization: string;
    rank?: string;
    maxRating?: number;
    registrationTimeSeconds: number;
    maxRank?: string;
    email?: string;
}

export interface BlogEntries {
    originalLocale: string;
    allowViewHistory: boolean;
    creationTimeSeconds: number;
    rating: number;
    authorHandle: string;
    modificationTimeSeconds: number;
    id: number;
    title: string;
    locale: string;
    tags: string[];
}

export interface UserRating {
    contestId: number;
    contestName: string;
    handle: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
}

export interface Problem {
    contestId?: number;
    index: string;
    name: string;
    type: string;
    points?: number;
    rating?: number;
    tags: string[];
    problemsetName?: string;
}

export interface Member {
    handle: string;
}

export interface Author {
    contestId?: number;
    members: Member[];
    participantType: string;
    ghost: boolean;
    startTimeSeconds?: number;
    teamId?: number;
    teamName?: string;
    room?: number;
}

export interface UserStatus {
    id: number;
    contestId?: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: Problem;
    author: Author;
    programmingLanguage: string;
    verdict: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
    points?: number;
}

interface Response {
    status: string | boolean;
}

interface getUserInfoResponse extends Response {
    result: UserInfo[];
}

interface getUserBlogEntriesResponse extends Response {
    result: BlogEntries[];
}

interface getUserRatingResponse extends Response {
    result: UserRating[];
}

interface getUserStatusResponse extends Response {
    result: UserStatus[];
}

export const cf = {
    getUserInfo: function(handle: string) {
        return new Promise(resolve => {
            request
                .get(`${host}/api/user.info?handles=${handle}`)
                .then((response: getUserInfoResponse) => {
                    if (response?.status === 'OK') {
                        resolve(response.result[0]);
                    } else {
                        resolve(null);
                    }
                });
        });
    },
    getUserBlogEntries: function(handle: string) {
        return new Promise(resolve => {
            request
                .get(`${host}/api/user.blogEntries?handle=${handle}`)
                .then((response: getUserBlogEntriesResponse) => {
                    if (response?.status === 'OK') {
                        resolve(response.result);
                    } else {
                        resolve(null);
                    }
                });
        });
    },
    getUserRating: function(handle: string) {
        return new Promise(resolve => {
            request
                .get(`${host}/api/user.rating?handle=${handle}`)
                .then((response: getUserRatingResponse) => {
                    if (response?.status === 'OK') {
                        resolve(response.result);
                    } else {
                        resolve(null);
                    }
                });
        });
    },
    getUserStatus: function(handle: string) {
        return new Promise(resolve => {
            request
                .get(
                    `${host}/api/user.status?handle=${handle}&from=1&count=998244353`,
                )
                .then((response: getUserStatusResponse) => {
                    if (response?.status === 'OK') {
                        resolve(response.result);
                    } else {
                        resolve(null);
                    }
                });
        });
    },
};
