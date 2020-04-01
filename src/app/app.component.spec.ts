import { RouterTestingModule } from "@angular/router/testing";
import helper, { toArray } from "src/testing/helper";
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

function getRouterLinks(parent: HTMLElement): HTMLAnchorElement[] {
  const routerLinks: NodeListOf<HTMLAnchorElement> = parent.querySelectorAll(
    "a[routerLink]"
  );
  return toArray(routerLinks);
}

describe("AppComponent", () => {
  it("creates the app", async () => {
    const { component } = await setupComponentClass();

    expect(component).toBeTruthy();
  });

  it("renders a navigation item 'list'", async () => {
    const { element } = await setupElement();
    const routerLinks: HTMLAnchorElement[] = getRouterLinks(element);
    const linkTexts: String[] = routerLinks.map(elem => `${elem.textContent}`);
    expect(linkTexts).toContain("list");
  });

  it("provides a link to '/list'", async () => {
    const { element } = await setupElement();
    const routerLinks: HTMLAnchorElement[] = getRouterLinks(element);
    const linksToList: HTMLAnchorElement[] = routerLinks.filter(elem =>
      elem.href.endsWith("/list")
    );
    expect(linksToList.length).toBe(1);
    expect(linksToList[0].href.endsWith("/list")).toBeTrue();
  });
});
