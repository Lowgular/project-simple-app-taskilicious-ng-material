import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnDestroy {
  sub = new Subscription();
  category = new FormControl('categoryName', [Validators.required]);

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  createCategoryHandler() {
    if (!!this.category.value) {
      this.sub = this.categoryService
        .createCategory({ name: this.category.value })
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    }
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
  }
}
