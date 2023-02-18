import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesFormComponent } from "./components/categories-form/categories-form.component";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { UcWidgetModule } from "ngx-uploadcare-widget";

@NgModule({
  declarations: [CategoriesFormComponent, TaskFormComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzNotificationModule,
    NzCheckboxModule,
    UcWidgetModule
  ],
})
export class SharedModule {}
