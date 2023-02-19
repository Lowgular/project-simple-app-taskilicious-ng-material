import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { Constants } from 'src/app/shared/constants';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends BaseApiService<CategoryModel> {
    private sortCategory = new Subject<string>();
    sortCategory$ = this.sortCategory.asObservable();

    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    setSortCategory(value: string) {
        this.sortCategory.next(value);
    }

    getCategories(): Observable<CategoryModel[]> {
        return this.getAll(`${environment.apiEndpoint}${Constants.CATEGORY_ENDPOINT}`)
    }

    createCategory(payload: Omit<CategoryModel, 'id'>): Observable<CategoryModel> {
        return this.post(environment.apiEndpoint + Constants.CATEGORY_ENDPOINT, payload)
    }

    updateCategory(payload: CategoryModel): Observable<CategoryModel> {
        return this.put(`${environment.apiEndpoint + Constants.CATEGORY_ENDPOINT}/` + payload.id, payload)
    }

    getCategoryById(id: string): Observable<CategoryModel> {
        return this.get(`${environment.apiEndpoint + Constants.CATEGORY_ENDPOINT}/` + id)
    }
}