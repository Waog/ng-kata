import ListComponentDriver from "./list.component.driver.spec";

describe("List integration", () => {
  it("can be created", async () => {
    const { component } = await ListComponentDriver.setupWithDeps();

    expect(component).toBeTruthy();
  });

  it("initializes with 3 Todos", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();

    fixture.detectChanges();
    const items = driver.getItemTexts();

    expect(items.length).toEqual(3);
  });

  it("initializes with 2 checked Todos", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const checkedItems = driver.getCheckedItemTexts();
    expect(checkedItems.length).toEqual(2);
  });

  it("unchecks clicked checked items", async () => {
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();

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
    const { driver, fixture } = await ListComponentDriver.setupWithDeps();

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
