import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category/category.service";
import {TaskService} from "../../service/task/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  id = this.activatedRoute.snapshot.params['id'];
  task: any;
  name = '';
  categoryId: any;
  categories: any;
  selectedOptions: string[] = [];
  team: any;
  constructor(private categoryService: CategoryService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.getCategories();
      this.getTaskById();
  }

    getTaskById() {
        this.taskService.getTaskById(parseFloat(this.id)).subscribe(
            (data: any) => {
                this.task = data;
                this.name = this.task.name;
            }
        );
    }
    getCategories() {
        this.categoryService.getCategories().subscribe(
            (data: any) => {
              this.categories = data;
            }
        )
    }

    editTask(value: any) {
        this.taskService.editTask(value, parseFloat(this.id)).subscribe(
            () => {
                this.router.navigate(['categories/' + localStorage.getItem('idCategory')])
            }
        )
    }
}
