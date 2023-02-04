import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private _httpClient: HttpClient) {
  }
  getAll(): Observable<CategoryModel[]> {
    return this._httpClient.get<CategoryModel[]>('https://63761992b5f0e1eb850298da.mockapi.io/categories')
    }

    create(createCategory: Omit<CategoryModel, 'id'>): Observable<CategoryModel> {
        return this._httpClient.post<CategoryModel>('https://63761992b5f0e1eb850298da.mockapi.io/categories', createCategory)
      }
      
      update(cat:CategoryModel): Observable<CategoryModel>{
        return this._httpClient.put<CategoryModel>('https://63761992b5f0e1eb850298da.mockapi.io/categories/' + cat.id, cat)
      }
      
      getOne(id:string): Observable<CategoryModel> {
        return this._httpClient.get<CategoryModel>('https://63761992b5f0e1eb850298da.mockapi.io/categories/' + id)
      }
      
  }

