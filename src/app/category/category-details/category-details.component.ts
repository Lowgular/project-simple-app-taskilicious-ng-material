import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  categoryName: string = '';

  constructor(
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
        this.categoryName = res.name;
      });
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
  }
}
