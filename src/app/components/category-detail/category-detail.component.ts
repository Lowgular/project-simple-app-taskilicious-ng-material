import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-detail',
  styleUrls: ['./category-detail.component.scss'],
  templateUrl: './category-detail.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDetailComponent {
  readonly category$: Observable<CategoryModel> = this._activatedRoute.params.pipe(
    switchMap(data => this._categoryService.getOne(data['id'])))

constructor(private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute) {
}

}
