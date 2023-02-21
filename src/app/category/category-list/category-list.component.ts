import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
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
  options: string[] = ['A-Z', 'Z-A'];
  selectedOption = new FormControl();
  private sortCategoriesSubject: Subject<any> = new Subject<any>();

  constructor(private categoryService: CategoryService) {
    this.selectedOption.valueChanges.subscribe((x) => {
      if (!!this.categories)
        if (x === 'A-Z')
          this.sortCategoriesSubject.next(this.filterByPriority(1));
        else {
          this.sortCategoriesSubject.next(this.filterByPriority(-1));
        }
    });
  }

  ngOnInit(): void {
    this.sub = this.categoryService.getCategories().subscribe((categories) => {
      (this.categories = categories.slice(0, 10)), this.filterByPriority();
    });
    this.selectedOption.setValue('A-Z');
  }

  filterByPriority(asc = 1) {
    this.categories.sort((a, b) => asc * a.name.localeCompare(b.name));
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
  }
}
