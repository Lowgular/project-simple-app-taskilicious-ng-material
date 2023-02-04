import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  styleUrls: ['./category.component.scss'],
  templateUrl: './category.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();

  constructor(private _categoryService: CategoryService) {
  }
}
