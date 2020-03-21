import { Component } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  public todos = ["Clean up", "homework", "bla bla"];
  public checkedTodos: string[] = ["homework"];
}
