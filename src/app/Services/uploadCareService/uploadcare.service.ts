import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadClient } from '@uploadcare/upload-client'
import { Observable } from 'rxjs';
import { IUploadResponse } from 'src/app/Models/IUploadResponse';


@Injectable({
  providedIn: 'root'
})
export class UploadcareService {

  private baseUrl = "https://upload.uploadcare.com/base/";

  constructor(private http : HttpClient) { 
  }

  upload(file: File) : Observable<IUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('UPLOADCARE_PUB_KEY', '8bd0aab2965c9c5ba830');

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<IUploadResponse>(this.baseUrl, formData, { headers: headers });
  }
}