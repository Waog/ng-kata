import { FormsModule } from "@angular/forms";
import helper, { toArray } from "src/testing/helper";
import { MaterialModule } from "../material/material.module";
import { ListComponent } from "./list.component";

const componentClass = ListComponent;
const moduleDef = {
  imports: [MaterialModule, FormsModule],
  declarations: [componentClass]
};

const setupComponentClass = async () =>
  helper.setupComponentClass(componentClass, moduleDef);

const setupElement = async () => helper.setupElement(componentClass, moduleDef);

const setupComponent = async () =>
  helper.setupComponent(componentClass, moduleDef);

describe("ListComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponentClass();
    expect(component).toBeTruthy();
  });

  it("should get the checked items correctly", async () => {
    const { component } = await setupComponentClass();
    component.todos = [
      { id: 1, checked: false },
      { id: 2, checked: true },
      { id: 3, checked: true }
    ] as any;
    expect(component.checkedTodos).toEqual([2, 3]);
  });

  it("should set the checked items correctly", async () => {
    const { component } = await setupComponentClass();
    component.todos = [
      { id: 1, checked: true },
      { id: 2, checked: true },
      { id: 3, checked: false }
    ] as any;

    component.checkedTodos = [2, 3];

    expect(component.todos).toEqual([
      { id: 1, checked: false },
      { id: 2, checked: true },
      { id: 3, checked: true }
    ] as any);
  });

  it("should render a material list", async () => {
    const { element } = await setupElement();
    const matList = element.querySelector("mat-selection-list");
    expect(matList).toBeTruthy();
  });

  it("should render it's items", async () => {
    const { component, element } = await setupComponent();
    const classItems = component.todos.map(todo => todo.text);
    const matListItems = element.querySelectorAll(
      "mat-selection-list > mat-list-option"
    ) as NodeListOf<HTMLLIElement>; // hack, because no material types exist
    const matListItemsArr = toArray(matListItems);
    const elemItems = matListItemsArr.map(elem => elem.innerText);
    expect(elemItems).toEqual(classItems);
  });

  it("should render checkmarks for checked items", async () => {
    const { fixture, component, element } = await setupComponent();
    fixture.detectChanges();
    const checkedTexts = component.todos
      .filter(todo => todo.checked)
      .map(todo => todo.text);
    const checkboxNodes = element.querySelectorAll(
      "mat-selection-list > mat-list-option mat-pseudo-checkbox"
    );
    const checkboxArr = toArray(checkboxNodes);
    const checkedCheckboxes = checkboxArr.filter(
      checkboxElem =>
        checkboxElem.getAttribute("ng-reflect-state") === "checked"
    );
    const checkedElementTexts = checkedCheckboxes.map(
      checkboxElem => checkboxElem.parentElement.innerText
    );
    expect(checkedElementTexts).toEqual(checkedTexts);
  });
});
