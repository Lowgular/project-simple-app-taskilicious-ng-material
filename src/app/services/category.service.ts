import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Constants } from '../shared/constants';
import { Category } from '../shared/models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ApiService<Category> {
  private sortCategory = new Subject<string>();
  sortCategory$ = this.sortCategory.asObservable();

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getCategories(): Observable<Category[]> {
    return this.get(
      `${environment.apiEndpoint}${Constants.CATEGORY_ENDPOINT}`
    );
  }
}
