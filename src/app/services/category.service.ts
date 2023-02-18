import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

const categoriesURL = 'https://63761992b5f0e1eb850298da.mockapi.io/categories';
const categoryTasksURL = 'https://63761992b5f0e1eb850298da.mockapi.io/tasks';
const taskTeamMembersURL = 'https://63761992b5f0e1eb850298da.mockapi.io/team-members';
const imageUploadURL = 'https://upload.uploadcare.com/base/';

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Object> {
        return this.http.get(categoriesURL);
    }

    getCategoryById(id: number): Observable<Object> {
        return this.http.get(categoriesURL + '/' + id);
    }

    addCategory(newCategory: {name: string}) {
        return this.http.post(categoriesURL, newCategory);
    }

    updateCategory(id: number, name: string) {
        return this.http.put(categoriesURL + '/' + id, {name: name});
    }

    getCategoryTasks(): Observable<Object> {
        return this.http.get(categoryTasksURL);
    }

    addCategoryTask(newTask: {categoryId: number, name: string, teamMemberIds: number[], imageUrl: string}) {
        return this.http.post(categoryTasksURL, newTask);
    }

    deleteCategoryTask(taskId:number) {
        return this.http.delete(categoryTasksURL + '/' + taskId);
    }

    editCategoryTask(editedTask: {categoryId: number, name: string, teamMemberIds: number[]}, taskId: number) {
        return this.http.put(categoryTasksURL + '/' + taskId, editedTask);
    }

    getCategoryTaskById(taskId: number): Observable<Object> {
        return this.http.get(categoryTasksURL + '/' + taskId);
    }

    getTeamMembers(): Observable<Object> {
        return this.http.get(taskTeamMembersURL);
    }
}