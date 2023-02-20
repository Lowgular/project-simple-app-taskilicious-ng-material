import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from 'src/app/Models/icategory';
import { ICreateCategory } from 'src/app/Models/iCreateCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'https://63761992b5f0e1eb850298da.mockapi.io/';

  constructor(private http : HttpClient) { }


  getCategoryList() : Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}categories`);
  }

  getCategoryByID(categoryId : string) : Observable<ICategory> {
    return this.http.get<ICategory>(`${this.baseUrl}categories/${categoryId}`);
  }

  createCategory(category : ICategory) : Observable<ICategory> {
    const categoryname : ICreateCategory = { name: ''};
    categoryname.name = category.name;
    
    return this.http.post<ICategory>(`${this.baseUrl}categories`, categoryname);
  }

  editCategory(category : ICategory) : Observable<ICategory> {
    return this.http.put<ICategory>(`${this.baseUrl}categories/${category.id}`, category);
  }

  
}
