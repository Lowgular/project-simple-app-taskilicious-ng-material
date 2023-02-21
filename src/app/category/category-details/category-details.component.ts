import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { Category } from 'src/app/shared/models/category';
import { Task } from 'src/app/shared/models/task';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  tasksSub = new Subscription();
  categoryName: string = '';
  tasks: Task[] = [];
  displayedColumns: string[] = ['name', 'categoryId'];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        switchMap((res: any) => {
          return this.categoryService.getCategoryById(res.id);
        })
      )
      .subscribe((res: Category) => {
        this.categoryName = res.name;
        this.tasksSub = this.taskService.getTasks().subscribe((tasks) => {
          this.tasks = tasks.filter(
            (task: Task) => task.categoryId == Number(res.id)
          );
        });
      });
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.tasksSub) this.tasksSub.unsubscribe();
  }
}
