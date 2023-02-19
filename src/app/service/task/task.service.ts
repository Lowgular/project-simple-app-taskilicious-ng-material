import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getTasksofOneCategory(id: number) {
    return this.http.get(`${this.url}/tasks?categoryId=` + id);
  }

  getTaskById(id: number) {
    return this.http.get(`${this.url}/tasks/` + id);
  }

  addTask(data: any) {
    return this.http.post(`${this.url}/tasks`, data);
  }

  editTask(data: any, id: number) {
    return this.http.put(`${this.url}/tasks/` + id, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.url}/tasks/` + id);
  }

  getTeamMembers() {
    return this.http.get(`${this.url}/team-members`);
  }

  getTeamMembersById(id: number) {
    return this.http.get(`${this.url}/team-members/${id}`);
  }
}
