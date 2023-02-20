import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { distinctUntilChanged, map, startWith, Subject } from "rxjs";
import { ICategory } from "src/app/Models/icategory";
import { CategoryService } from "src/app/Services/CategoryService/category.service";

@Component({
  selector: "app-show-category-list",
  templateUrl: "./show-category-list.component.html",
  styleUrls: ["./show-category-list.component.scss"],
})
export class ShowCategoryListComponent implements OnInit {
  categoryList: ICategory[] = [];

  sortOrder: string = "asc";
  data$: Subject<ICategory[]> = new Subject<ICategory[]>();
  sortOrder$: Subject<string> = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoryList();

    this.data$
      .pipe(
        startWith([]),
        distinctUntilChanged(),
        map((data) => this.sortData(data))
      )
      .subscribe((categoryList) => {
        this.categoryList = categoryList;
      });

    this.sortOrder$
      .pipe(
        startWith(this.sortOrder),
        distinctUntilChanged(),
        map((sortOrder) => (sortOrder === "asc" ? 1 : -1))
      )
      .subscribe((sortDirection) => {
        this.categoryList = this.categoryList.slice().sort((a, b) => {
          return sortDirection * this.compare(a.name, b.name);
        });
      });
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe({
      next: (obs) => {
        this.data$.next(obs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSortOrderChange() {
    this.sortOrder$.next(this.sortOrder);
  }

  sortData(data: ICategory[]) {
    return data.slice().sort((a, b) => {
      return this.compare(a.name, b.name);
    });
  }

  compare(a: string, b: string) {
    // Handle empty strings
    if (a === '') {
      return -1;
    } else if (b === '') {
      return 1;
    }
  
    // Handle strings containing numbers
    const aNumber = Number(a);
    const bNumber = Number(b);
    if (!isNaN(aNumber) && !isNaN(bNumber)) {
      return this.sortOrder === 'asc' ? aNumber - bNumber : bNumber - aNumber;
    } else if (!isNaN(aNumber)) {
      return -1;
    } else if (!isNaN(bNumber)) {
      return 1;
    }
  
    // Handle normal strings
    const cmp = a.localeCompare(b);
    return this.sortOrder === 'asc' ? cmp : -cmp;
  }
  
  
  
  
}
