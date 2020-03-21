import helper from "src/testing/helper";
import { MaterialModule } from "../material/material.module";
import { ListComponent } from "./list.component";

const componentClass = ListComponent;
const moduleDef = {
  imports: [MaterialModule],
  declarations: [componentClass]
};

const setupComponentClass = async () =>
  helper.setupComponentClass(componentClass, moduleDef);

const setupElement = async () => helper.setupElement(componentClass, moduleDef);

describe("ListComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponentClass();
    expect(component).toBeTruthy();
  });

  it("should render a material list with items", async () => {
    const { element } = await setupElement();
    const matList = element.querySelector("mat-list");
    const matListItems = element.querySelectorAll("mat-list > mat-list-item");
    expect(matList).toBeTruthy();
    expect(matListItems.length).toBeGreaterThan(0);
  });
});
