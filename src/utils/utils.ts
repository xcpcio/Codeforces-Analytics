export function DeepCopy(Obj: Object) {
    return JSON.parse(JSON.stringify(Obj));
}
