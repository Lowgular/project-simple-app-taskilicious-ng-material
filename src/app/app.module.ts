import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { CategoryService } from './services/category.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add_edit_category.component';
import { InfoCategoryComponent } from './components/info-category/info-category.component';
import { AddEditTaskComponent } from './components/add-edit-task/add_edit_task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEditCategoryComponent,
    InfoCategoryComponent,
    AddEditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
