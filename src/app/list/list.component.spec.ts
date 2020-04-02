import { TestBed } from "@angular/core/testing";
import { Spied } from "src/testing/jasmine.extensions";
import ListComponentDriver from "./list.component.driver.spec";
import { ListService } from "./list.service";
import Todo from "./todo";

describe("ListComponent", () => {
  it("creates", async () => {
    const { driver } = await ListComponentDriver.setupWithSpies();

    expect(driver).toBeTruthy();
    expect(driver.component).toBeTruthy();
    expect(driver.element).toBeTruthy();
  });

  it("initializes with dependencies", async () => {
    const { component } = await ListComponentDriver.setupWithSpies();

    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;

    expect(component.listService).toBe(listServiceSpy);
  });

  it("mirrors ListService's Todos'", async () => {
    const todos: Todo[] = [{}, {}] as any;
    const { component, fixture } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    listServiceSpy.getTodos.and.returnValue(todos);

    fixture.detectChanges();

    expect(component.todos).toBe(todos);
  });

  it("mirrors ListService's checked state", async () => {
    const checkedIds = [2, 3];
    const { component, fixture } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;

    listServiceSpy.getCheckedIds.and.returnValue(checkedIds);
    fixture.detectChanges();

    expect(component.checkedTodos).toEqual(checkedIds);
    expect(listServiceSpy.getCheckedIds).toHaveBeenCalled();
  });

  it("sets checked state on ListService", async () => {
    const checkedIds = [2, 3];
    const { component, fixture } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;

    fixture.detectChanges();
    component.checkedTodos = checkedIds;

    expect(listServiceSpy.setCheckedIds).toHaveBeenCalledWith(checkedIds);
    expect(listServiceSpy.setCheckedIds).toHaveBeenCalledTimes(1);
  });

  it("renders a list", async () => {
    const { driver } = await ListComponentDriver.setupWithSpies();
    expect(driver.getListNode()).toBeTruthy();
  });

  it("renders the item texts from ListService", async () => {
    const todos: Todo[] = [
      { id: 1, checked: false, text: "A" },
      { id: 2, checked: false, text: "B" }
    ];
    const todoTexts = ["A", "B"];
    const checkedIds = [];
    const { driver, fixture } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    listServiceSpy.getTodos.and.returnValue(todos);
    listServiceSpy.getCheckedIds.and.returnValue(checkedIds);

    fixture.detectChanges();
    const itemTexts = driver.getItemTexts();

    expect(itemTexts).toEqual(todoTexts);
  });

  it("renders the checkmarks of checked todos", async () => {
    // TODO: try to reduce input to the minimum
    const todos: Todo[] = [
      { id: 1, checked: false, text: "A" },
      { id: 2, checked: true, text: "B" },
      { id: 3, checked: true, text: "C" }
    ];
    const checkedIds = [2, 3];
    const checkedTexts = ["B", "C"];
    const { driver, fixture } = await ListComponentDriver.setupWithSpies();
    const listServiceSpy = TestBed.inject(ListService) as Spied<ListService>;
    listServiceSpy.getTodos.and.returnValue(todos);
    listServiceSpy.getCheckedIds.and.returnValue(checkedIds);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const checkedElementTexts = driver.getCheckedItemTexts();
    expect(checkedElementTexts).toEqual(checkedTexts);
  });
});
