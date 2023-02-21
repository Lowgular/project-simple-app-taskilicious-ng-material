import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  categories: Category[] = [];
  taskFormGroup = new FormGroup({
    name: new FormControl('New Task', [Validators.required]),
    categoryId: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.['id'])
      localStorage.setItem(
        'categoryId',
        this.router.getCurrentNavigation()?.extras.state?.['id']
      );
  }

  ngOnInit(): void {
    this.sub = this.categoryService.getCategories().subscribe((categories) => {
      (this.categories = categories.slice(0, 10)).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
    this.taskFormGroup.controls['categoryId'].setValue(
      localStorage.getItem('categoryId')
    );
  }

  submitHandler() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value;
    let name = this.taskFormGroup.controls['name'].value;
    if (categoryId && name) {
      this.taskService
        .createTask({ name: name, categoryId: Number(categoryId) })
        .subscribe((res) =>
          this.router.navigate(['/', 'categories', categoryId])
        );
    }
  }

  ngOnDestroy() {
    if (!!this.sub) this.sub.unsubscribe();
  }
}
