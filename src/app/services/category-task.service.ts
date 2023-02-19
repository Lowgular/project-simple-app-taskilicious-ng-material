import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { Constants } from 'src/app/shared/constants';
import { TaskModel } from 'src/app/shared/models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryTaskService extends BaseApiService<TaskModel> {

    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    getCategoryTask(): Observable<TaskModel[]> {
        return this.getAll(environment.apiEndpoint + Constants.CATEGORY_TASK_ENDPOINT)
    }

    createCategoryTask(payload: Omit<TaskModel, 'id'>): Observable<TaskModel> {
        return this.post(environment.apiEndpoint + Constants.CATEGORY_TASK_ENDPOINT, payload)
    }

    updateCategoryTask(payload: TaskModel): Observable<TaskModel> {
        return this.put(`${environment.apiEndpoint + Constants.CATEGORY_TASK_ENDPOINT}/` + payload.id, payload)
    }

    getCategoryTaskById(id: string): Observable<TaskModel> {
        return this.get(`${environment.apiEndpoint + Constants.CATEGORY_TASK_ENDPOINT}/` + id)
    }

    deleteCategoryTaskById(id: string): Observable<TaskModel> {
        return this.delete(`${environment.apiEndpoint + Constants.CATEGORY_TASK_ENDPOINT}/` + id)
    }

    uploadCategoryImage(formData: FormData): Observable<any> {
        return this.post(`${environment.storageEndpoint + Constants.UPLOAD_CARE_ENDPOINT}/`, formData);
    }
}