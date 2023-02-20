import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';


import { ShowCategoryListComponent } from './Components/show-category-list/show-category-list.component';
import { CreateCategoryFormComponent } from './Components/create-category-form/create-category-form.component';
import { EditCategoryFormComponent } from './Components/edit-category-form/edit-category-form.component';
import { CategoryFormComponent } from './Components/category-form/category-form.component';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { CreateTaskFormComponent } from './Components/create-task-form/create-task-form.component';
import { EditTaskFormComponent } from './Components/edit-task-form/edit-task-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    ShowCategoryListComponent,
    CreateCategoryFormComponent,
    EditCategoryFormComponent,
    CategoryFormComponent,
    CategoryDetailsComponent,
    TaskFormComponent,
    CreateTaskFormComponent,
    EditTaskFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
