import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MaterialsModule } from '../shared/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './task/task.component';

@NgModule({
  declarations: [TaskEditComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TaskModule {}
