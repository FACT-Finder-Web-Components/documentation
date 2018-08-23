export function IsDefinedFunctor(value) {
    return Object.freeze({
        map: value === undefined || value === null
            ? () => IsDefinedFunctor()
            : fn => IsDefinedFunctor(fn(value))
    })
}
