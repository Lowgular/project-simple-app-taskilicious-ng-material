import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortDropdownComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();
  readonly sortSelection: FormControl;
  readonly sortOptions = [
    { label: "A-Z", value: SortOptions.Ascending },
    { label: "Z-A", value: SortOptions.Descending },
  ];
  constructor(private readonly categoryService: CategoryService) {
    const [{ value }] = this.sortOptions;
    this.sortSelection = new FormControl(value);
  }

  ngOnInit(): void {
    this.sortSelection.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(() =>
        this.categoryService.setSortCategory(this.sortSelection.value));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

export enum SortOptions {
  Ascending = "Asc",
  Descending = "Desc",
}