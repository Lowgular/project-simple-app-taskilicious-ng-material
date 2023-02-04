import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateCategoryComponent } from './create-category.component';
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, RouterLink],
  declarations: [CreateCategoryComponent],
  providers: [],
  exports: [CreateCategoryComponent]
})
export class CreateCategoryComponentModule {
}
