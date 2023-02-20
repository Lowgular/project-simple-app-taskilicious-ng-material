import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from 'src/app/Models/iTask';
import { TaskService } from 'src/app/Services/TaskService/task.service';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {

  constructor(private taskService : TaskService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onFormSubmit(newTask : ITask) {
    this.taskService.createTask(newTask).subscribe({
      next: (obs) => {
        this.router.navigate(['categories', newTask.categoryId])
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

}
