import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NzNotificationDataOptions,
  NzNotificationService,
} from "ng-zorro-antd/notification";
import { catchError, finalize, of, Subject, takeUntil } from "rxjs";
import { CategoriesService } from "src/app/core/services/categories.service";
import { CategoryTaskService } from "src/app/core/services/category-task.service";
import { CategoriesList } from "../../models/categories-list.model";
import { Task } from "../../models/task.model";
import { TeamMember } from "../../models/team-members.model";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"],
})
export class TaskFormComponent implements OnInit {
  public taskForm!: FormGroup;
  public isLoading: boolean = false;
  public categoryTask: number = 0;
  public title: string = "";
  public button: string = "";
  public categories: CategoriesList[] = [];
  public categoryId: string = "";
  public teamMembers: TeamMember[] = [];
  public teamMemberId: string[] = [];
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryTaskService: CategoryTaskService,
    private notification: NzNotificationService
  ) {
    this.categoryTask = Number(this.route.snapshot.paramMap.get("id"));
    this.taskForm = this.fb.group({
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.getCategories();
    this.getTeamMembers();
    this.title = this.categoryTask ? "Edit Task" : "Create Task";
    this.button = this.categoryTask ? "Update" : "Create";
    if (this.categoryTask) this.getCategoryTask();
  }

  public getCategoryTask(): void {
    this.isLoading = true;
    this.categoryTaskService
      .getCategoryTask(this.categoryTask)
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        const { name, categoryId, teamMemberIds } = res;
        const formControls = this.taskForm.controls;
        formControls["name"].setValue(name);
        formControls["category"].setValue(categoryId);
        this.categoryId = formControls["category"].value;
        if (teamMemberIds) this.teamMemberId = teamMemberIds;
      });
  }

  public submitForm(): void {
    this.categoryTask ? this.updateCategory() : this.createCategory();
  }

  public createCategory(): void {
    if (this.taskForm.invalid) return;

    this.isLoading = true;
    const formValue = this.taskForm.value;

    const payload: Partial<Task> = {
      categoryId: this.categoryId,
      name: formValue.name,
    };

    if (this.teamMemberId) {
      payload.teamMemberIds = this.teamMemberId;
    }

    this.categoryTaskService
      .createTask(payload)
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        if (res) {
          const notificationConfig: NzNotificationDataOptions = {
            nzPlacement: "bottomRight",
            nzDuration: 3000,
          };
          this.notification.success(
            "Created a Category Task",
            "",
            notificationConfig
          );
          this.router.navigate([`/categories/${this.categoryId}`]);
        }
      });
  }

  public updateCategory(): void {
    if (this.taskForm.invalid) return;

    this.isLoading = true;
    const formValue = this.taskForm.value;
    const payload: Partial<Task> = {
      categoryId: this.categoryId,
      name: formValue.name,
    };
    if (this.teamMemberId) {
      payload.teamMemberIds = this.teamMemberId;
    }

    this.categoryTaskService
      .updateTask(this.categoryTask, payload)
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        if (res) {
          const notificationConfig: NzNotificationDataOptions = {
            nzPlacement: "bottomRight",
            nzDuration: 3000,
          };
          this.notification.success(
            "Updated the Category Task",
            "",
            notificationConfig
          );
          this.router.navigate([`/categories/${this.categoryId}`]);
        }
      });
  }

  public getCategories(): void {
    this.isLoading = true;
    this.categoriesService
      .getCategories()
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res: CategoriesList[]) => {
        this.categories = res;
      });
  }

  public validate(event: string): void {
    this.categoryId = event;
  }

  public getTeamMembers(): void {
    this.isLoading = true;
    this.categoryTaskService
      .getTeamMembers()
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
        this.teamMembers = res;
      });
  }

  public selectedTeamMember(value: string[]): void {
    this.teamMemberId = value;
  }
}
