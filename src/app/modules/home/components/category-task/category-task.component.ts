import { finalize, of, Subject } from "rxjs";
import { catchError } from "rxjs";
import { takeUntil } from "rxjs";
import { CategoryTaskService } from "./../../../../core/services/category-task.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NzNotificationDataOptions,
  NzNotificationService,
} from "ng-zorro-antd/notification";
import { TeamMember } from "src/app/shared/models/team-member.model";
import { Task } from "src/app/shared/models/task.model";

@Component({
  selector: "app-category-task",
  templateUrl: "./category-task.component.html",
  styleUrls: ["./category-task.component.scss"],
})
export class CategoryTaskComponent implements OnInit {
  public categoryId: string | null = "";
  public isLoading: boolean = false;
  public tasks: Task[] = [];
  public teamMembers: TeamMember[] = [];

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private categoryTaskService: CategoryTaskService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.categoryId = this.route.snapshot.paramMap.get("id");
  }

  public ngOnInit(): void {
    this.getTask();
  }

  public getTask(): void {
    this.isLoading = true;
    this.categoryTaskService
      .getTask()
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
        this.tasks = res.filter(
          (item: Task) => item.categoryId == this.categoryId
        );
        this.getTeamMembers();
      });
  }

  public addTask(): void {
    this.router.navigate(["/task/0"]);
  }

  public editCategory(id: number): void {
    this.router.navigate([`/task/${id}`]);
  }

  public deleteCategory(id: number): void {
    this.isLoading = true;
    this.categoryTaskService
      .deleteTask(id)
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
        this.notification.success(
          "Deleted the category",
          "",
          notificationConfig
        );
        this.getTask();
      });
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
        const filteredTeamMembers = res.filter((member: TeamMember) => {
          return this.tasks.some((task: Task) => {
            return task.teamMemberIds && task.teamMemberIds.includes(member.id);
          });
        });
        this.teamMembers = filteredTeamMembers;
      });
  }
}
