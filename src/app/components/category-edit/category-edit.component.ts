import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  styleUrls: ['./category-edit.component.scss'],
  templateUrl: './category-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryEditComponent {
  readonly form: FormGroup = new FormGroup({
    name: new FormControl() });
  
  constructor(private _categoryService: CategoryService , private _activatedRoute: ActivatedRoute, private _router: Router) {
  }
  
  onFormSubmitted(form: FormGroup) {
    this._activatedRoute.params
        .pipe(
            switchMap((data) =>
                this._categoryService.update({
                  id:data['id'],
                  ...form.value,
                }))
        ).subscribe(() => this._router.navigate(['']))}
  
}
