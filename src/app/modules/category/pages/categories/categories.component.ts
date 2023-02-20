import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/category";
import { CategoriesService } from "../../services/categories/categories.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  title: string = "Categories";
  categoriesList: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAllCategories().then(
      (data) => {
        this.categoriesList = data;
      },
      (error) => {
        this.categoriesList = [];
      }
    );
  }
}
