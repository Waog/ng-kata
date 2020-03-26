import { Component } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  public todos = [
    { id: 1, text: "Clean up", checked: false },
    { id: 2, text: "bla bla", checked: false },
    { id: 3, text: "homework", checked: true }
  ];

  private cachedCheckedTodoIds = []; // workaround for https://github.com/angular/angular/issues/11097

  public get checkedTodos(): number[] {
    const result = this.todos.filter(todo => todo.checked).map(todo => todo.id);
    if (_.isEqual(result, this.cachedCheckedTodoIds)) {
      return this.cachedCheckedTodoIds;
    }
    this.cachedCheckedTodoIds = result;
    return result;
  }

  public set checkedTodos(checkedIds: number[]) {
    this.todos.forEach(todo => (todo.checked = checkedIds.includes(todo.id)));
  }
}
