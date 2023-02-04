import { NgModule } from '@angular/core';
import { CategoryEditComponent } from './category-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, RouterLink],
  declarations: [CategoryEditComponent],
  providers: [],
  exports: [CategoryEditComponent]
})
export class CategoryEditComponentModule {
}
