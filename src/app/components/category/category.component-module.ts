import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './category.component';
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [MatListModule, CommonModule, MatButtonModule, MatIconModule, RouterLink],
  declarations: [CategoryComponent],
  providers: [],
  exports: [CategoryComponent]
})
export class CategoryComponentModule {
}
