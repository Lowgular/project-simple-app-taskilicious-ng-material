import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ICategory } from "src/app/Models/icategory";
import { CategoryService } from "src/app/Services/CategoryService/category.service";

@Component({
  selector: "app-edit-category-form",
  templateUrl: "./edit-category-form.component.html",
  styleUrls: ["./edit-category-form.component.scss"],
})
export class EditCategoryFormComponent implements OnInit {
  category: ICategory = { name: "" };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onFormSubmit(category: ICategory) {
    this.categoryService.editCategory(category).subscribe({
      next: (obs) => {
        this.router.navigate(["/"]);
        this.snackBar.open("Category Edited!", "Ok", { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(err.error, "", { duration: 3000 });
      },
    });
  }
}
