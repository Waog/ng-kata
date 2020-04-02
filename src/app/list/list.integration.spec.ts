import ListComponentDriver from "./list.component.driver.spec";

// TODO: DRY (all detectChanges and whenStable)
describe("List integration", () => {
  it("can be created", async () => {
    const { component } = await ListComponentDriver.setupWithDeps();

    expect(component).toBeTruthy();
  });

  it("initializes with 3 Todos", async () => {
    const { driver } = await ListComponentDriver.setupWithDeps();

    const items = driver.getItemTexts();
    expect(items.length).toEqual(3);
  });

  it("initializes with some checked Todos", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();
    fixture.detectChanges(); // why is this necessary a second time?

    const checkedItems = driver.getCheckedItemTexts();
    expect(checkedItems.length).toBeGreaterThan(0);
  });

  it("initializes with some unchecked Todos", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();
    fixture.detectChanges(); // why is this necessary a second time?

    const uncheckedItems = driver.getUncheckedItemTexts();
    expect(uncheckedItems.length).toBeGreaterThan(0);
  });

  it("unchecks clicked checked items", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();
    fixture.detectChanges(); // why is this necessary a second time?
    const itemToClick: string = driver.getCheckedItemTexts()[0];
    expect(driver.isDone(itemToClick)).toBeTrue();

    driver.clickItem(itemToClick);
    fixture.detectChanges(); // update the view

    expect(driver.isDone(itemToClick)).toBeFalse();
  });

  it("checks clicked unchecked items", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();
    fixture.detectChanges();
    const itemToClick: string = driver.getUncheckedItemTexts()[0];
    expect(driver.isDone(itemToClick)).toBeFalse();

    driver.clickItem(itemToClick);
    fixture.detectChanges(); // update the view

    expect(driver.isDone(itemToClick)).toBeTrue();
  });
});
