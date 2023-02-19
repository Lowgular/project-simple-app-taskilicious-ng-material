import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../service/task/task.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})

export class CategoryDetailComponent implements OnInit {
    name: any;
    id = this.activatedRoute.snapshot.params['id'];
    tasks: any = [];
    displayedColumns: string[] = ['name', 'category', 'team', 'edit', 'delete'];
    constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private taskService: TaskService, private router: Router) { }
    ngOnInit(): void {
      localStorage.setItem('idCategory', this.id);
      this.getCategoryById();
      this.getTasksOfOneCategory();
    }
    getCategoryById() {
        this.categoryService.getCategoryById(parseFloat(this.id)).subscribe(
            (data: any) => {
              this.name = data.name;
            }
        );
    }

    getTasksOfOneCategory() {
        this.taskService.getTasksofOneCategory(parseFloat(this.id)).subscribe(
            (data: any) => {
              this.tasks = data;
              data.forEach((value: any) => {
                  const teams = value.teamMemberIds;
                  teams.forEach((value: any) => {
                      console.log(value);
                  })
              })
            }
        );
    }

    deleteTask(id: number) {
        this.taskService.deleteTask(id).subscribe(
            () => {
                this.ngOnInit()
            }, error => console.log(error)
        );
    }

    createTask() {
        this.router.navigate(['tasks/create']);
    }

    editTask(id: number) {
        this.router.navigate(['tasks/' + id])
    }
}
