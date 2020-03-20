import { Binding } from './binding';
import { TypeKey } from './utils';

export type Binder<T> = TypeKey<T> | ValueBinder<T> | ClassBinder<T> | ProviderBinder<T>;
export type BinderObject<T> = ValueBinder<T> | ClassBinder<T> | ProviderBinder<T>;

type ValueBinder<T> = {
  bind: TypeKey<T>;
  value: Parameters<Binding<T>['value']>[0];
};

type ClassBinder<T> = {
  bind: TypeKey<T>;
  to: Parameters<Binding<T>['to']>[0];
};

type ProviderBinder<T> = {
  bind: TypeKey<T>;
  provider: Parameters<Binding<T>['provider']>[0];
};

export function applyBinder<T>(binding: Binding<T>, binder: BinderObject<T>): Binding<T> {
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
