import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { Category } from 'src/app/shared/models/category';
import { Task } from 'src/app/shared/models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  catSub = new Subscription();
  categories: Category[] = [];
  task: Task | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        switchMap((res: any) => {
          return this.taskService.getTaskById(res.id);
        })
      )
      .subscribe((res: Task) => {
        this.task = res;
        this.taskFormGroup.setValue({
          name: res.name,
          categoryId: res.categoryId.toString(),
        });
      });

    this.catSub = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        (this.categories = categories.slice(0, 10)).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      });
  }

  submitHandler() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value;
    let name = this.taskFormGroup.controls['name'].value;
    if (categoryId && name) {
      this.taskService
        .editTask({
          name: name,
          categoryId: Number(categoryId),
          id: this.task?.id,
        })
        .subscribe((res) =>
          this.router.navigate(['/', 'categories', categoryId])
        );
    }
  }

  ngOnDestroy() {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.catSub) this.catSub.unsubscribe();
  }
}
