import { Component, Input, OnInit } from "@angular/core";
import { Category } from "../../models/category";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  title: string = "Choose a category";
  @Input("categories") categories: Category[] = [];

  constructor() {}

  ngOnInit(): void {}
}
