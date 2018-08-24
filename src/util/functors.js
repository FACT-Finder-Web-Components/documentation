export function IsDefinedFunctor(value) {
    return Object.freeze({
        valueOf: () => value,
        map: value === undefined || value === null
            ? () => IsDefinedFunctor()
            : fn => IsDefinedFunctor(fn(value))
    })
}
