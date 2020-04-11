import { TestBed } from "@angular/core/testing";
import { ListService } from "./list.service";

describe("ListService", () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it("creates", () => {
    expect(service).toBeTruthy();
  });

  it("initializes with 3 Todos", () => {
    expect(service.getTodos().length).toEqual(3);
  });

  it("initializes with 2 checked Todos", () => {
    expect(service.getCheckedIds().length).toEqual(2);
  });

  it("sets and gets checked Todos", () => {
    const checkedIds = [1, 2];
    service.setCheckedIds(checkedIds);

    expect(service.getCheckedIds()).toEqual(checkedIds);
  });
});
