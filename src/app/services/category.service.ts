import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Constants } from '../shared/constants';
import { Category } from '../shared/models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ApiService<Category> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getCategories(): Observable<Category[]> {
    return this.get(`${environment.apiEndpoint}${Constants.CATEGORY_ENDPOINT}`);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.getOne(
      `${environment.apiEndpoint + Constants.CATEGORY_ENDPOINT}/` + id
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.post(
      environment.apiEndpoint + Constants.CATEGORY_ENDPOINT,
      category
    );
  }

  editCategory(category: Category): Observable<Category> {
    return this.put(
      `${environment.apiEndpoint + Constants.CATEGORY_ENDPOINT}/` + category.id,
      category
    );
  }
}
