import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Task } from '../shared/models/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends ApiService<Task> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getTasks(): Observable<Task[]> {
    return this.get(`${environment.apiEndpoint}${Constants.TASKS_ENDPOINT}`);
  }
}
