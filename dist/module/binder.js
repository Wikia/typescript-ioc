export function applyBinder(binding, binder) {
    if ('value' in binder) {
        return binding.value(binder.value);
    }
    if ('to' in binder) {
        return binding.to(binder.to);
    }
    if ('provider' in binder) {
        return binding.provider(binder.provider);
    }
    return binding;
}
//# sourceMappingURL=binder.js.map