import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskCreateComponent } from './task-create/task-create.component';
import { MaterialsModule } from '../shared/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [TaskCreateComponent, TaskEditComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TaskModule {}
