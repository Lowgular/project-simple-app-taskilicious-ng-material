import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { CategoriesComponent } from "./components/categories/categories.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzIconModule } from "ng-zorro-antd/icon";
import { IconDefinition } from "@ant-design/icons-angular";
import { PlusCircleFill } from "@ant-design/icons-angular/icons";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { CategoryTaskComponent } from "./components/category-task/category-task.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const icons: IconDefinition[] = [PlusCircleFill];

@NgModule({
  declarations: [CategoriesComponent,CategoryTaskComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzTableModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzDropDownModule,
    NzCardModule,
    NzNotificationModule
  ],
})
export class HomeModule {}
