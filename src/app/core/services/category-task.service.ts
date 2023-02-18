import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "src/app/shared/models/task.model";
import { TeamMember } from "src/app/shared/models/team-members.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryTaskService {
  constructor(private http: HttpClient) {}

  public getTask(): Observable<Task[]> {
    const url = environment.baseURL + `/tasks`;
    return this.http.get<Task[]>(url);
  }

  public createTask(payload: Partial<Task>): Observable<Task> {
    const url = environment.baseURL + `/tasks`;
    return this.http.post<Task>(url, payload);
  }

  public getCategoryTask(userId: number): Observable<Task> {
    const url = environment.baseURL + `/tasks/` + userId;
    return this.http.get<Task>(url);
  }

  public updateTask(userId: number, payload: Partial<Task>): Observable<Task> {
    const url = environment.baseURL + `/tasks/` + userId;
    return this.http.put<Task>(url, payload);
  }

  public deleteTask(categoryId: number): Observable<Task> {
    const url = environment.baseURL + `/tasks/` + categoryId;
    return this.http.delete<Task>(url);
  }

  public getTeamMembers(): Observable<TeamMember[]> {
    const url = environment.baseURL + `/team-members`;
    return this.http.get<TeamMember[]>(url);
  }
}
