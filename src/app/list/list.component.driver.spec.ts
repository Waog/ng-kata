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
  private component: ListComponent;
  private element: HTMLElement;
  private fixture: ComponentFixture<ListComponent>;

  public static async setupWithSpies() {
    return ListComponentDriver.setupDriver(true);
  }

  public static async setupWithDeps() {
    return ListComponentDriver.setupDriver(false);
  }

  private static async setupDriver(useSpies: boolean) {
    const driver = new ListComponentDriver();
    await driver.init(useSpies);
    await driver.sync();
    return {
      driver,
      component: driver.component,
      element: driver.element
    };
  }

  private constructor() {}

  private async init(useSpies: boolean) {
    const { component, element, fixture } = await this.setupTestBed(useSpies);
    this.component = component;
    this.element = element;
    this.fixture = fixture;
  }

  async sync() {
    this.fixture.detectChanges();
    await this.fixture.whenStable();
    this.fixture.detectChanges();
  }

  private async setupTestBed(useSpies: boolean) {
    return helper.setupTestBed(ListComponent, this.createModuleDef(useSpies));
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

  async clickItem(text: string) {
    this.getItem(text).click();
    await this.sync();
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
