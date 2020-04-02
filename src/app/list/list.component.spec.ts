import { TestBed } from "@angular/core/testing";
import { Spied } from "src/testing/jasmine.extensions";
import ListComponentDriver from "./list.component.driver.spec";
import { ListService } from "./list.service";
import Todo from "./todo";

describe("ListComponent", () => {
  it("creates", async () => {
    const {
      driver,
      component,
      element
    } = await ListComponentDriver.setupWithSpies();

    expect(driver).toBeTruthy();
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
  });

  it("initializes with dependencies", async () => {
    const { component } = await ListComponentDriver.setupWithSpies();

    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;

    expect(component.listService).toBe(listServiceSpy);
  });

  it("mirrors ListService's Todos'", async () => {
    const { component } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    const todos: Todo[] = [{}, {}] as any;

    listServiceSpy.getTodos.and.returnValue(todos);

    expect(component.todos).toBe(todos);
  });

  it("mirrors ListService's checked state", async () => {
    const { component } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    const checkedIds = [2, 3];

    listServiceSpy.getCheckedIds.and.returnValue(checkedIds);

    expect(component.checkedTodos).toEqual(checkedIds);
    expect(listServiceSpy.getCheckedIds).toHaveBeenCalled();
  });

  it("sets checked state on ListService", async () => {
    const { component } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    const checkedIds = [2, 3];
    expect(listServiceSpy.setCheckedIds).toHaveBeenCalledTimes(0);

    component.checkedTodos = checkedIds;

    expect(listServiceSpy.setCheckedIds).toHaveBeenCalledWith(checkedIds);
    expect(listServiceSpy.setCheckedIds).toHaveBeenCalledTimes(1);
  });

  it("renders a list", async () => {
    const { driver } = await ListComponentDriver.setupWithSpies();

    expect(driver.getListNode()).toBeTruthy();
  });

  it("renders the item texts from ListService", async () => {
    const { driver } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    const todos: Todo[] = [{ text: "A" }, { text: "B" }] as any;

    listServiceSpy.getTodos.and.returnValue(todos);
    await driver.sync();

    const itemTexts = driver.getItemTexts();
    expect(itemTexts).toEqual(["A", "B"]);
  });

  it("renders the checkmarks of checked todos", async () => {
    const { driver } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    const todos: Todo[] = [
      { id: 1, text: "A" },
      { id: 2, text: "B" },
      { id: 3, text: "C" }
    ] as any;
    const checkedIds = [2, 3];

    listServiceSpy.getTodos.and.returnValue(todos);
    listServiceSpy.getCheckedIds.and.returnValue(checkedIds);
    await driver.sync();

    const checkedElementTexts = driver.getCheckedItemTexts();
    expect(checkedElementTexts).toEqual(["B", "C"]);
  });
});
