import { Type } from "@angular/core";
import { TestBed, TestModuleMetadata } from "@angular/core/testing";

async function setupFixture<T>(
  componentClass: Type<T>,
  moduleDef: TestModuleMetadata
) {
  await TestBed.configureTestingModule(moduleDef).compileComponents();
  const fixture = TestBed.createComponent(componentClass);
  return { fixture };
}

async function setupComponentClass<T>(
  componentClass: Type<T>,
  moduleDef: TestModuleMetadata
) {
  const { fixture } = await setupFixture(componentClass, moduleDef);
  const component = fixture.componentInstance;
  return { fixture, component };
}

async function setupElement<T>(
  componentClass: Type<T>,
  moduleDef: TestModuleMetadata
) {
  const { fixture } = await setupFixture(componentClass, moduleDef);
  fixture.detectChanges();
  const element: HTMLElement = fixture.nativeElement;
  return { fixture, element };
}

async function setupComponent<T>(
  componentClass: Type<T>,
  moduleDef: TestModuleMetadata
) {
  const { fixture, element } = await setupElement(componentClass, moduleDef);
  return { fixture, element, component: fixture.componentInstance };
}

export function toArray<T extends Node>(nodeList: NodeListOf<T>): T[] {
  return Array.prototype.slice.call(nodeList);
}

export default { setupComponentClass, setupElement, setupComponent, toArray };
