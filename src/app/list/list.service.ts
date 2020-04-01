import { Injectable } from "@angular/core";
import Todo from "./todo";

@Injectable({
  providedIn: "root"
})
export class ListService {
  private todos: Todo[] = [
    { id: 1, checked: false, text: "Clean Up" },
    { id: 2, checked: true, text: "Homework" },
    { id: 3, checked: true, text: "more" }
  ];

  setCheckedIds(ids: number[]) {
    this.todos.forEach(todo => (todo.checked = ids.includes(todo.id)));
  }

  getCheckedIds(): number[] {
    return this.todos.filter(todo => todo.checked).map(todo => todo.id);
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}
