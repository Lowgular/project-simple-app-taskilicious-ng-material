import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../models/category";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(public http: HttpClient) {}

  createCategory(data: any): Promise<any> {
    const URL: string = "categories";

    return new Promise((resolve, reject) => {
      const response = this.http.post(URL, data);
      response.subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAllCategories(): Promise<Category[]> {
    const URL: string = "categories";

    return new Promise((resolve, reject) => {
      const response = this.http.get<Category[]>(URL);
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }
}
