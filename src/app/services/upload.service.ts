import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService extends ApiService<File> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.post(
      `${environment.imageApiEndpoint}/`,
      formData
    );
  }
}
