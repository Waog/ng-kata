import { toArray } from "src/testing/helper";

type HTMLMatListOptionElement = HTMLLIElement; // hack, because no material types exist
type HTMLMatSelectionListElement = HTMLUListElement; // hack, because no material types exist

export default class ListComponentDriver {
  constructor(private element: HTMLElement) {}

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
