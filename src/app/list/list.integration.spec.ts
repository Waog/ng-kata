import { FormsModule } from "@angular/forms";
import helper from "src/testing/helper";
import { MaterialModule } from "../material/material.module";
import { ListComponent } from "./list.component";
import ListComponentDriver from "./list.component.driver.spec";
import { ListService } from "./list.service";

const componentClass = ListComponent;
const createModuleDef = () => {
  return {
    imports: [MaterialModule, FormsModule],
    declarations: [componentClass],
    providers: [ListService]
  };
};

const setupComponentClass = async () =>
  helper.setupComponentClass(componentClass, createModuleDef());

const setupElement = async () =>
  helper.setupElement(componentClass, createModuleDef());

const setupComponent = async () =>
  helper.setupComponent(componentClass, createModuleDef());

describe("List integration", () => {
  it("can be created", async () => {
    const { component } = await setupComponentClass();

    expect(component).toBeTruthy();
  });

  it("initializes with 3 Todos", async () => {
    const { element, fixture } = await setupComponent();
    const driver = new ListComponentDriver(element);

    fixture.detectChanges();
    const items = driver.getItemTexts();

    expect(items.length).toEqual(3);
  });

  it("initializes with 2 checked Todos", async () => {
    const { fixture, component, element } = await setupComponent();
    const driver = new ListComponentDriver(element);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const checkedItems = driver.getCheckedItemTexts();
    expect(checkedItems.length).toEqual(2);
  });

  it("unchecks clicked checked items", async () => {
    const { fixture, component, element } = await setupComponent();
    const driver = new ListComponentDriver(element);

    // TODO: DRY (all detectChanges & whenStables)
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const clickedItem: string = driver.getCheckedItemTexts()[0];
    expect(driver.isDone(clickedItem)).toBeTrue();

    driver.clickItem(clickedItem);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(driver.isDone(clickedItem)).toBeFalse();
  });

  it("checks clicked unchecked items", async () => {
    const { fixture, component, element } = await setupComponent();
    const driver = new ListComponentDriver(element);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const clickedItem: string = driver.getUncheckedItemTexts()[0];
    expect(driver.isDone(clickedItem)).toBeFalse();

    driver.clickItem(clickedItem);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(driver.isDone(clickedItem)).toBeTrue();
  });
});
