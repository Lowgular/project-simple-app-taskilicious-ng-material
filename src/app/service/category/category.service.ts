import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${this.url}/categories`);
  }

    getCategoryById(id: any) {
    return this.http.get(`${this.url}/categories/${id}`);
  }

  addCategory(data: any) {
    return this.http.post(`${this.url}/categories`, data);
  }

  updateCategory(data: any, id: number) {
    return this.http.put(`${this.url}/categories/${id}`, data);
  }

}
