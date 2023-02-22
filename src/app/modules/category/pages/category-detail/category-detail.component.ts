import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/category";
import { CategoriesService } from "../../services/categories/categories.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-category-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.scss"],
})
export class CategoryDetailComponent implements OnInit {
  title: string = "Welcome to category:";
  categoryData: Category | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
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
}
