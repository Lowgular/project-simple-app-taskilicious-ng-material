import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject, forkJoin, map, of, takeUntil } from 'rxjs';
import { CategoryTaskService } from 'src/app/services/category-task.service';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TeamMemberService } from './../../services/team-member.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-category-details',
  templateUrl: './list-category-details.component.html',
  styleUrls: ['./list-category-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoryDetailsComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe = new Subject<void>();
  categoryId: string | null = null;
  readonly categoryListColumns = ["image", "name", "teamMemberIds", "categoryId", "edit", "remove"]
  categoryDetails$: Observable<CategoryDetails> = of({} as CategoryDetails);

  constructor(private readonly taskService: CategoryTaskService,
    private readonly categoryService: CategoryService,
    private readonly teamMemberService: TeamMemberService,
    private readonly categoryTaskService: CategoryTaskService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: ParamMap) => {
      this.categoryId = params.get('id');
      this.getDetails();
    });
  }

  getDetails() {
    if (this.categoryId !== null) {
      this.categoryDetails$ = forkJoin({
        category: this.categoryService.getCategoryById(this.categoryId),
        categorytask: this.taskService.getCategoryTask(),
        teamMembers: this.teamMemberService.getTaskMembers(),
      }).pipe(
        takeUntil(this.ngUnsubscribe),
        map(res => {
          const categoryTask = res.categorytask.filter(x => x.categoryId === this.categoryId).map(result =>
          ({
            ...result,
            teamMember: res.teamMembers.filter(q => Array.isArray(result.teamMemberIds) && result.teamMemberIds?.includes(q.id))
          }))
          return {
            category: { ...res.category },
            categoryTask: categoryTask
          } as CategoryDetails
        })
      )
    }
  }


  handleActionEvents(event: string, element: TaskModel) {
    switch (event) {
      case "edit":
        this.router.navigate(["task/edit", element.id]);
        break;
      case "delete":
        this.categoryTaskService.deleteCategoryTaskById(element.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.getDetails());
        break;
      default:
        break;
    }
  }
  createCategoryTask() {
    this.router.navigate(["task/create"]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

interface CategoryDetails {
  category: CategoryModel,
  categoryTask: TaskModel[]
}
