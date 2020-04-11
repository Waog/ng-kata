import ListComponentDriver from "./list.component.driver.spec";

describe("List integration", () => {
  it("can be created", async () => {
    const {
      driver,
      component,
      element
    } = await ListComponentDriver.setupWithDeps();

    expect(driver).toBeTruthy();
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
  });

  it("initializes with 3 Todos", async () => {
    const { driver } = await ListComponentDriver.setupWithDeps();

    const items = driver.getItemTexts();
    expect(items.length).toEqual(3);
  });

  it("initializes with some checked Todos", async () => {
    const { driver } = await ListComponentDriver.setupWithDeps();

    const checkedItems = driver.getCheckedItemTexts();
    expect(checkedItems.length).toBeGreaterThan(0);
  });

  it("initializes with some unchecked Todos", async () => {
    const { driver } = await ListComponentDriver.setupWithDeps();

    const uncheckedItems = driver.getUncheckedItemTexts();
    expect(uncheckedItems.length).toBeGreaterThan(0);
  });

  it("unchecks clicked checked items", async () => {
    const { driver } = await ListComponentDriver.setupWithDeps();
    const itemToClick: string = driver.getCheckedItemTexts()[0];
    expect(driver.isDone(itemToClick)).toBeTrue();

    await driver.clickItem(itemToClick);

    expect(driver.isDone(itemToClick)).toBeFalse();
  });

  it("checks clicked unchecked items", async () => {
    const { driver } = await ListComponentDriver.setupWithDeps();
    const itemToClick: string = driver.getUncheckedItemTexts()[0];
    expect(driver.isDone(itemToClick)).toBeFalse();

    await driver.clickItem(itemToClick);

    expect(driver.isDone(itemToClick)).toBeTrue();
  });
});
