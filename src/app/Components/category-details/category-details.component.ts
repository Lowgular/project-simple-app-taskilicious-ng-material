import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICategory } from "src/app/Models/icategory";
import { ITask } from "src/app/Models/iTask";
import { CategoryService } from "src/app/Services/CategoryService/category.service";
import { TaskService } from "src/app/Services/TaskService/task.service";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"],
})
export class CategoryDetailsComponent implements OnInit {
  category: ICategory = { name: "" };
  currentCategoryId : string | null = '';
  tasks : ITask[] = [] ;
  displayedColumns: string[] = ['name', 'CategoryId',  'edit', 'remove'];
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private taskService : TaskService
  ) {}

  ngOnInit(): void {
    this.currentCategoryId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getCategoryById();
    this.getTasksList();
  }

  getCategoryById() {
    if (this.currentCategoryId != null) {
      this.categoryService.getCategoryByID(this.currentCategoryId).subscribe({
        next: (obs) => {
          this.category = obs;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getTasksList() {
    this.taskService.getTasksList().subscribe({
      next: (obs) => {
        this.tasks = obs.filter(task => task.categoryId === this.currentCategoryId)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDelete(id : string) {
    this.taskService.deleteTask(id).subscribe({
      next: (obs) => {
        this.getTasksList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


