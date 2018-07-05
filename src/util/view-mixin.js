let Mixin = (superclass) => class extends superclass {
    isActiveView() {
        return this.classList.contains("iron-selected");
    }
};

export default function ViewMixin(prototype) {
    return Mixin(prototype);
};