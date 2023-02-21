import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  sub = new Subscription();
  selected = 'ASC';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.sub = this.categoryService.getCategories().subscribe((categories) => {
      (this.categories = categories.slice(0, 10)), this.filterByPriority();
    });
  }

  filterByPriority(asc = 1) {
    var categories = this.categories;
    categories.sort((a, b) => asc * a.name.localeCompare(b.name));
    this.categories = [...categories];
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
  }
}
