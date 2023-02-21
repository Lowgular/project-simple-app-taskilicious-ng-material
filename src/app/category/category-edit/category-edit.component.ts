import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  editSub = new Subscription();
  category: Category | undefined;
  categoryEdit = new FormControl();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        switchMap((res: any) => {
          return this.categoryService.getCategoryById(res.id);
        })
      )
      .subscribe((res: Category) => {
        this.category = res;
        this.categoryEdit.setValue(res.name);
      });
  }

  editCategoryHandler() {
    this.editSub = this.categoryService
      .editCategory({
        id: this.category?.id,
        name: this.categoryEdit.value,
      })
      .subscribe((res) => {
        alert('Successfully updated');
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.editSub) this.editSub.unsubscribe();
  }
}
