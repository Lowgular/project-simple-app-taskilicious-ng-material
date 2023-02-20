import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService } from "../../services/categories/categories.service";
@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"],
})
export class CategoriesFormComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  @Output() status = new EventEmitter<string>();

  constructor(
    private _formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      name: ["", [Validators.required]],
    });
  }

  onSubmit() {
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
}
