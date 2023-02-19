import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  CategoriesList,
} from "src/app/shared/models/categories-list.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<CategoriesList[]> {
    const url = environment.baseURL + `/categories`;
    return this.http.get<CategoriesList[]>(url);
  }

  public getCategory(userId: number): Observable<CategoriesList> {
    const url = environment.baseURL + `/categories/` + userId;
    return this.http.get<CategoriesList>(url);
  }

  public updateCategory(
    userId: number,
    payload: CategoriesList
  ): Observable<CategoriesList> {
    const url = environment.baseURL + `/categories/` + userId;
    return this.http.put<CategoriesList>(url, payload);
  }

  public createCategory(
    payload: Partial<CategoriesList>
  ): Observable<CategoriesList[]> {
    const url = environment.baseURL + `/categories`;
    return this.http.post<CategoriesList[]>(url, payload);
  }
}
