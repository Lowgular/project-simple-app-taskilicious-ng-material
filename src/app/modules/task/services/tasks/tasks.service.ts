import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../../models/task";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(public http: HttpClient) {}

  getAllTasks(categoryId: string): Promise<Task[]> {
    const URL: string = `tasks?categoryId=${categoryId}`;

    return new Promise((resolve, reject) => {
      const response = this.http.get<Task[]>(URL);
      response.subscribe((data) => {
        const filteredData = data.filter(
          (item) => item.categoryId == Number(categoryId)
        );
        resolve(filteredData);
      });
    });
  }
}
