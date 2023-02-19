import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NzNotificationDataOptions,
  NzNotificationService,
} from "ng-zorro-antd/notification";
import { catchError, of, Subject, takeUntil, finalize } from "rxjs";
import { CategoriesService } from "src/app/core/services/categories.service";
import { CategoriesList } from "../../models/categories-list.model";

@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"],
})
export class CategoriesFormComponent implements OnInit {
  public categoryForm!: FormGroup;
  public isLoading: boolean = false;
  public categoryId: number = 0;
  public title: string = "";
  public button: string = "";

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {
    this.categoryForm = this.fb.group({
      userName: ["", [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.categoryId = params.get("id");
    });
    this.title = this.categoryId ? "Edit Category" : "Create Category";
    this.button = this.categoryId ? "Update" : "Create";
    if (this.categoryId) this.getCategory();
  }

  public getCategory(): void {
    this.isLoading = true;
    this.categoriesService
      .getCategory(this.categoryId)
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        this.categoryForm.controls["userName"].setValue(res.name);
      });
  }

  public submitForm(): void {
    this.categoryId ? this.updateCategory() : this.createCategory();
  }

  public createCategory(): void {
    if (this.categoryForm.invalid) return;
    this.isLoading = true;
    const payload: Partial<CategoriesList> = {
      name: this.categoryForm.value.userName,
    };
    this.categoriesService
      .createCategory(payload)
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        const notificationConfig: NzNotificationDataOptions = {
          nzPlacement: "bottomRight",
          nzDuration: 3000,
        };
        if (res?.error) {
          this.notification.error(
            "Error creating category",
            res.error,
            notificationConfig
          );
        } else {
          this.notification.success("Created the List", "", notificationConfig);
        }
        this.router.navigate(["/"]);
      });
  }

  public updateCategory(): void {
    if (this.categoryForm.invalid) return;
    this.isLoading = true;
    const payload: CategoriesList = {
      id: this.categoryId.toString(),
      name: this.categoryForm.value.userName,
    };
    this.categoriesService
      .updateCategory(this.categoryId, payload)
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        const notificationConfig: NzNotificationDataOptions = {
          nzPlacement: "bottomRight",
          nzDuration: 3000,
        };
        this.notification.success("Updated the List", "", notificationConfig);
        this.router.navigate(["/"]);
      });
  }
}
