import { Type } from "@angular/core";
import { TestBed, TestModuleMetadata } from "@angular/core/testing";

export async function setupTestBed<T>(
  componentClass: Type<T>,
  moduleDef: TestModuleMetadata
) {
  await TestBed.configureTestingModule(moduleDef).compileComponents();
  const fixture = TestBed.createComponent(componentClass);
  const element: HTMLElement = fixture.nativeElement;
  return { fixture, element, component: fixture.componentInstance };
}

export function toArray<T extends Node>(nodeList: NodeListOf<T>): T[] {
  return Array.prototype.slice.call(nodeList);
}

export default { setupTestBed, toArray };
