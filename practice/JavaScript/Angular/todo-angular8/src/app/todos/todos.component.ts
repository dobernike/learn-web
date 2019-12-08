import { Component, OnInit, Input, Output } from "@angular/core";
import { Todo } from "../app.component";
import { EventEmitter } from "events";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.sass"]
})
export class TodosComponent implements OnInit {
  @Input() todos: Todo[] = [];
  // @Output() onToggle = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onChange(id: number) {
    // this.onToggle.emit(id);
  }
}
