import { request } from '@/utils/request';
import { host } from '@/model';

interface Response {
    status: string | boolean;
}

export interface UserCf {
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
}

interface getOneResponse extends Response {
    result: UserCf[];
}

export const cf = {
    getOne: function(handle: string) {
        return new Promise(resolve => {
            request
                .get(`${host}/api/user.info?handles=${handle}`)
                .then((response: getOneResponse) => {
                    if (response.status === 'OK') {
                        resolve(response.result[0]);
                    } else {
                        resolve(null);
                    }
                });
        });
    },
};
