import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  styleUrls: ['./create-category.component.scss'],
  templateUrl: './create-category.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryComponent {

  constructor(private _categoryService: CategoryService, private _router: Router) {
  }  

  readonly form: FormGroup = new FormGroup({ 
    name: new FormControl() });

  onFormSubmitted(form: FormGroup): void {
      this._categoryService.create({
        name: form.get('name')?.value,
      }).subscribe(() => this._router.navigate(['']));
  }
    
}
