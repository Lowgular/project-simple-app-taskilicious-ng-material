import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ICategory } from "src/app/Models/icategory";
import { CategoryService } from "src/app/Services/CategoryService/category.service";

@Component({
  selector: "app-create-category-form",
  templateUrl: "./create-category-form.component.html",
  styleUrls: ["./create-category-form.component.scss"],
})
export class CreateCategoryFormComponent implements OnInit {
  categoryForm = new FormControl("", Validators.required);

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {}

  onFormSubmit(category: ICategory) {
      this.categoryService.createCategory(category).subscribe({
        next: (obs) => {
          this.router.navigateByUrl("/");
          this.snackBar.open("Category Added!", "", { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open(err.error, "", { duration: 3000 });
        }
      });
  }

}
