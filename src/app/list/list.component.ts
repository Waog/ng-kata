import { Component } from "@angular/core";
import * as _ from "lodash";
import { ListService } from "./list.service";
import Todo from "./todo";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  // TODO: internalize listService
  constructor(public listService: ListService) {}

  private cachedCheckedTodoIds: number[] = []; // workaround for https://github.com/angular/angular/issues/11097

  public get todos(): Todo[] {
    // TODO: use observables instead; (possible with setter?)
    return this.listService.getTodos();
  }

  public get checkedTodos(): number[] {
    const result = this.listService.getCheckedIds();
    if (_.isEqual(result, this.cachedCheckedTodoIds)) {
      return this.cachedCheckedTodoIds;
    }
    this.cachedCheckedTodoIds = result;
    return result;
  }

  public set checkedTodos(checkedIds: number[]) {
    this.listService.setCheckedIds(checkedIds);
  }
}
