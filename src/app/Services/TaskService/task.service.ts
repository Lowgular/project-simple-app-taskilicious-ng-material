import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreateTask } from "src/app/Models/ICreateTask";
import { ITask } from "src/app/Models/iTask";
import { ITeamMember } from "src/app/Models/iteam-member";
import { IUpload } from "src/app/Models/IUpload";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private baseUrl = "https://63761992b5f0e1eb850298da.mockapi.io/tasks";
  private upload: IUpload;

  constructor(private http: HttpClient) {
    this.upload = {
      publicKey: "8bd0aab2965c9c5ba830",
      store: "auto",
      metadata: {
        subsystem: "uploader",
        pet: "cat",
      },
    };
  }

  getTasksList(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.baseUrl}`);
  }

  getTaskById(taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.baseUrl}/${taskId}`);
  }

  getTeamMembers(): Observable<ITeamMember[]> {
    return this.http.get<ITeamMember[]>(
      "https://63761992b5f0e1eb850298da.mockapi.io/team-members"
    );
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.baseUrl, task);
  }

  deleteTask(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`${this.baseUrl}/${taskId}`);
  }

  editTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.baseUrl}/${task.id}`, task);
  }

  uploadImage() {}
}
