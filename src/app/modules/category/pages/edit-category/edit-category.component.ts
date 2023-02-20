import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { Category } from "../../models/category";
import { CategoriesService } from "../../services/categories/categories.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"],
})
export class EditCategoryComponent implements OnInit {
  title: string = "Edit Category";
  categoryData: Category | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const categoryId = this._activatedRoute.snapshot.paramMap.get("categoryId");
    this.getCategory(categoryId!);
  }

  getCategory(categoryId: string) {
    this.categoriesService.getOneCategory(categoryId).then(
      (data) => {
        this.categoryData = data;
      },
      (error) => {
        this.categoryData = undefined;
      }
    );
  }

  formResponse(event: string) {
    if (event === "success") {
      this._location.back();
    }
  }
}
