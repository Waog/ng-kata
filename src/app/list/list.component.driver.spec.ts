import { ComponentFixture } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import helper, { toArray } from "src/testing/helper";
import { provideMock } from "src/testing/jasmine.extensions";
import { MaterialModule } from "../material/material.module";
import { ListComponent } from "./list.component";
import { ListService } from "./list.service";

type HTMLMatListOptionElement = HTMLLIElement; // hack, because no material types exist
type HTMLMatSelectionListElement = HTMLUListElement; // hack, because no material types exist

export default class ListComponentDriver {
  public component: ListComponent;
  public element: HTMLElement;
  public fixture: ComponentFixture<ListComponent>; // TODO: internalize if possible

  public static async setupWithSpies() {
    return ListComponentDriver.setupDriver(true);
  }

  public static async setupWithDeps() {
    return ListComponentDriver.setupDriver(false);
  }

  private static async setupDriver(useSpies: boolean) {
    const driver = new ListComponentDriver();
    await driver.init(useSpies);
    return {
      driver,
      component: driver.component,
      element: driver.element,
      fixture: driver.fixture
    };
  }

  private constructor() {}

  private async init(useSpies: boolean) {
    const { component, element, fixture } = await this.setupComponent(useSpies);
    this.component = component;
    this.element = element;
    this.fixture = fixture;
  }

  private async setupComponent(useSpies: boolean) {
    return helper.setupComponent(ListComponent, this.createModuleDef(useSpies));
  }

  private createModuleDef(useSpies: boolean) {
    return {
      imports: [MaterialModule, FormsModule],
      declarations: [ListComponent],
      providers: useSpies ? this.getSpyProviders() : this.getOriginalProviders()
    };
  }

  private getSpyProviders() {
    return [provideMock(ListService)];
  }

  private getOriginalProviders() {
    return [ListService];
  }

  getListNode(): HTMLMatSelectionListElement {
    return this.element.querySelector("mat-selection-list");
  }

  getItemTexts(): string[] {
    return this.getItemNodes().map(elem => elem.innerText);
  }

  getCheckedItemTexts(): string[] {
    return this.getCheckboxNodes()
      .filter(this.isChecked)
      .map(this.toItemText);
  }

  getUncheckedItemTexts(): string[] {
    return this.getCheckboxNodes()
      .filter(this.isUnchecked)
      .map(this.toItemText);
  }

  isDone(text: string): boolean {
    if (this.getCheckedItemTexts().includes(text)) {
      return true;
    } else if (this.getUncheckedItemTexts().includes(text)) {
      return false;
    }
    throw new Error(`item "${text}" is neither checked nor unchecked`);
  }

  clickItem(text: string) {
    this.getItem(text).click();
  }

  private getItem(text: string): HTMLMatListOptionElement {
    return this.getItemNodes().find(elem => elem.innerText.includes(text));
  }

  private getItemNodes(): HTMLMatListOptionElement[] {
    const listItemsNodeList = this.getListNode().querySelectorAll(
      "mat-list-option"
    ) as NodeListOf<HTMLMatListOptionElement>;
    return toArray(listItemsNodeList);
  }

  private getCheckboxNodes(): HTMLElement[] {
    return this.getItemNodes().map(this.toCheckboxNode);
  }

  private isChecked(checkboxNode: HTMLElement): boolean {
    return checkboxNode.getAttribute("ng-reflect-state") === "checked";
  }

  private isUnchecked(checkboxNode: HTMLElement): boolean {
    return checkboxNode.getAttribute("ng-reflect-state") === "unchecked";
  }

  private toItemText(checkboxNode: HTMLElement): string {
    return checkboxNode.parentElement.innerText;
  }

  private toCheckboxNode(itemNode: HTMLMatListOptionElement): HTMLElement {
    return itemNode.querySelector("mat-pseudo-checkbox");
  }
}
