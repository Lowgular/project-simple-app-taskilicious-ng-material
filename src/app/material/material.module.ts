import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatListModule],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
  ],
})
export class MaterialModule {}
