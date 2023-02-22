import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICategory } from "src/app/Models/icategory";
import { ITask } from "src/app/Models/iTask";
import { ITeamMember } from "src/app/Models/iteam-member";
import { CategoryService } from "src/app/Services/CategoryService/category.service";
import { TaskService } from "src/app/Services/TaskService/task.service";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"],
})
export class CategoryDetailsComponent implements OnInit {
  
  tasks : ITask[] = [] ;
  category: ICategory = { name: "" };
  currentCategoryId : string | null = '';
  teamMembers: ITeamMember[] = [];
  displayedColumns: string[] = ['taskImage', 'name', 'CategoryId', 'teamMembers', 'edit', 'remove'];
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private taskService : TaskService
  ) {}

  ngOnInit(): void {
    this.currentCategoryId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getCategoryById();
    this.getTasksList();
    this.getTeamMembers();
  }

  getCategoryById() : void {
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

  getTasksList() : void {
    this.taskService.getTasksList().subscribe({
      next: (obs) => {
        const currentCategoryTasks = obs.filter(task => task.categoryId === this.currentCategoryId); 
        this.tasks = currentCategoryTasks;
        console.log(currentCategoryTasks);
   
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDelete(id : string) : void {
    this.taskService.deleteTask(id).subscribe({
      next: (obs) => {
        this.getTasksList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTeamMembers() : void{
    this.taskService.getTeamMembers().subscribe({
      next: (obs) => {
        this.teamMembers = obs;
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  getTeamMemberImage(memberId: string): string {
    const teamMember = this.teamMembers.find(member => member.id === memberId);
    return teamMember ? teamMember.avatar : '';
  }
}



