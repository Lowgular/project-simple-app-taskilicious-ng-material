import { HttpClient, HttpBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Task } from "../../models/task";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  httpBackend: HttpClient;

  constructor(public http: HttpClient, public handler: HttpBackend) {
    this.httpBackend = new HttpClient(handler);
  }

  createTask(data: any): Promise<any> {
    const URL: string = "tasks";

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

  getOneTask(taskId: string): Promise<Task> {
    const URL: string = `tasks/${taskId}`;

    return new Promise((resolve, reject) => {
      const response = this.http.get<Task>(URL);
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  removeTask(taskId: string): Promise<Task> {
    const URL: string = `tasks/${taskId}`;

    return new Promise((resolve, reject) => {
      const response = this.http.delete<Task>(URL);
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  updateTask(taskId: string, data: any): Promise<any> {
    const URL: string = `tasks/${taskId}`;

    return new Promise((resolve, reject) => {
      const response = this.http.put(URL, data);
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  uploadTaskImage(data: FormData): Promise<any> {
    data.append("UPLOADCARE_PUB_KEY", environment.UPLOADCARE_PUB_KEY);
    const URL: string = environment.UPLOAD_URL;

    return new Promise((resolve, reject) => {
      const response = this.httpBackend.post(URL, data);
      response.subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
