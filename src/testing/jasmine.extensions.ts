import { Type } from "@angular/core";

export type Spied<T> = jasmine.SpyObj<T> | { [Method in keyof T]: jasmine.Spy };

export function spyOnClass<T>(spiedClass: Type<T>) {
  const prototype = spiedClass.prototype;

  const methods = Object.getOwnPropertyNames(prototype)
    .map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)])
    .filter(([name, descriptor]) => {
      return (descriptor as PropertyDescriptor).value instanceof Function;
    })
    .map(([name]) => name);

  return jasmine.createSpyObj("spy", [...methods]);
}

export function provideMock<T>(spiedClass: Type<T>) {
  return {
    provide: spiedClass,
    useValue: spyOnClass(spiedClass)
  };
}
