import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../models/category";
import { CategoriesService } from "../../services/categories/categories.service";
@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"],
})
export class CategoriesFormComponent implements OnInit {
  buttonTitle: string = "Create";
  categoryForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  @Input("categoryData") categoryData: Category | undefined;
  @Output() status = new EventEmitter<string>();

  constructor(
    private _formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      name: ["", [Validators.required]],
    });

    if (this.categoryData) {
      this.fillForm(this.categoryData);
      this.buttonTitle = "Submit";
    }
  }

  fillForm(formData: any) {
    const formProperties = this.categoryForm.value;
    const keys = Object.keys(formProperties);

    if (keys.length > 0) {
      for (let index = 0; index < keys.length; index++) {
        if (
          formData.hasOwnProperty(keys[index]) &&
          !Array.isArray(formData[keys[index]]) &&
          `${formData[keys[index]]}` != "null"
        ) {
          this.categoryForm
            .get(`${keys[index]}`)!
            .setValue(`${formData[keys[index]]}`);
        }
      }
    }
  }

  onSubmit() {
    if (this.categoryData) {
      this.updateCategory(this.categoryData.id);
    } else {
      this.createCategory();
    }
  }

  createCategory() {
    this.errorMessage = null;

    this.categoriesService.createCategory(this.categoryForm.value).then(
      (data) => {
        this.status.emit("success");
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  updateCategory(categoryId: string) {
    this.errorMessage = null;

    this.categoriesService
      .updateCategory(categoryId, this.categoryForm.value)
      .then(
        (data) => {
          this.status.emit("success");
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }
}
