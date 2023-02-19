import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { SortOptions } from 'src/app/ui/dropdown/sort-dropdown/sort-dropdown.component';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoryComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe = new Subject<void>();
  categoryList$ = this.categoryService.getCategories()
    .pipe(map(payload => payload.sort((a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase()))));

  constructor(private readonly categoryService: CategoryService,
    private readonly router: Router) {

  }

  ngOnInit(): void {
    this.categorySortEvent();
  }

  categorySortEvent() {
    this.categoryService.sortCategory$.subscribe(sort => {
      this.categoryList$ = this.categoryList$.pipe(takeUntil(this.ngUnsubscribe),
        map(payload => payload.sort((a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase()) * (sort === SortOptions.Ascending ? 1 : -1)))
      )
    })
  }

  createCategory() {
    this.router.navigate(["category/create"]);
  }

  editCategory(category: CategoryModel) {
    this.router.navigate(["category/edit", category.id])
  }
  categoryDetails(category: CategoryModel) {
    this.router.navigate(["category", category.id])
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
