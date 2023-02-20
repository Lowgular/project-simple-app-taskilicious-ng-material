import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiPrefixInterceptor } from "./interceptors/api-prefix/api-prefix.interceptor";
import { SpinnerInterceptor } from "./interceptors/spinner/spinner.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [NgxSpinnerModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
