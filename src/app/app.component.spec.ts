import { RouterTestingModule } from "@angular/router/testing";
import helper from "src/testing/helper";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";

const componentClass = AppComponent;
const moduleDef = {
  imports: [RouterTestingModule, MaterialModule],
  declarations: [componentClass]
};

const setupComponentClass = async () =>
  helper.setupComponentClass(componentClass, moduleDef);

const setupElement = async () => helper.setupElement(componentClass, moduleDef);

function toArray(nodeList: NodeListOf<HTMLAnchorElement>): HTMLAnchorElement[] {
  return Array.prototype.slice.call(nodeList);
}

function getRouterLinks(parent: HTMLElement): HTMLAnchorElement[] {
  const routerLinks: NodeListOf<HTMLAnchorElement> = parent.querySelectorAll(
    "a[routerLink]"
  );
  return toArray(routerLinks);
}

describe("AppComponent", () => {
  it("should create the app", async () => {
    const { component } = await setupComponentClass();

    expect(component).toBeTruthy();
  });

  it("should render a navigation item 'list'", async () => {
    const { element } = await setupElement();
    const routerLinks: HTMLAnchorElement[] = getRouterLinks(element);
    const linkTexts: String[] = routerLinks.map(elem => `${elem.textContent}`);
    expect(linkTexts).toContain("list");
  });

  it("should provide a link to '/list'", async () => {
    const { element } = await setupElement();
    const routerLinks: HTMLAnchorElement[] = getRouterLinks(element);
    const linksToList: HTMLAnchorElement[] = routerLinks.filter(elem =>
      elem.href.endsWith("/list")
    );
    expect(linksToList.length).toBe(1);
    expect(linksToList[0].href.endsWith("/list")).toBeTrue();
  });
});
