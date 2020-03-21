import { TestBed, TestModuleMetadata } from "@angular/core/testing";

async function setupFixture(
  componentClass: any,
  moduleDef: TestModuleMetadata
) {
  await TestBed.configureTestingModule(moduleDef).compileComponents();
  const fixture = TestBed.createComponent(componentClass);
  return { fixture };
}

async function setupComponentClass(
  componentClass: any,
  moduleDef: TestModuleMetadata
) {
  const { fixture } = await setupFixture(componentClass, moduleDef);
  const component = fixture.componentInstance;
  return { fixture, component };
}

async function setupElement(
  componentClass: any,
  moduleDef: TestModuleMetadata
) {
  const { fixture } = await setupFixture(componentClass, moduleDef);
  fixture.detectChanges();
  const element: HTMLElement = fixture.nativeElement;
  return { fixture, element };
}

export default { setupComponentClass, setupElement };
