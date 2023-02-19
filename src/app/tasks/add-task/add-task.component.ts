import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category/category.service";
import {TaskService} from "../../service/task/task.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
    categories: any;
    team: any;
    name: any;
    categoryId: any;
    selectedOptions: string[] = [];
    teamMember: any;

    constructor(private categoryService: CategoryService, private taskService: TaskService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCategories();
    this.getTeamMenbers();
  }

  getTeamMenbers() {
    this.taskService.getTeamMembers().subscribe(
        data => {
            this.team = data;
            console.log(this.team);
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

  addTask() {
    const data = {
        name: this.name,
        categoryId: this.categoryId,
        teamMemberIds: this.selectedOptions
    };
    this.taskService.addTask(data).subscribe(
        () => {
            this.router.navigate(['/categories/' + localStorage.getItem('idCategory')]);
        }
    );
  }


  onCheckboxChange(event: MatCheckboxChange, value: string) {
      console.log(value);
    if (event.checked) {
        this.selectedOptions.push(value);
    } else {
        const index = this.selectedOptions.indexOf(value);
        if (index !== -1) {
            this.selectedOptions.splice(index, 1);
        }
    }
  }
}
