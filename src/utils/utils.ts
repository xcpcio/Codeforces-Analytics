export function DeepCopy(Obj: Object) {
    return JSON.parse(JSON.stringify(Obj));
}

export const getNowTimeStamp = () => {
    return Math.round(new Date().getTime() / 1000);
};
