import { Component, Input, OnInit } from "@angular/core";
import { Task } from "../../models/task";
import { TeamMember } from "../../models/team-member";
import { TasksService } from "../../services/tasks/tasks.service";
import { TeamMembersService } from "../../services/team-members/team-members.service";

@Component({
  selector: "app-tasks-table",
  templateUrl: "./tasks-table.component.html",
  styleUrls: ["./tasks-table.component.scss"],
})
export class TasksTableComponent implements OnInit {
  @Input("categoryId") categoryId: string | undefined;
  tasksList: Task[] = [];
  displayedColumns: string[] = [
    "image",
    "name",
    "categoryId",
    "teamMembers",
    "edit",
    "remove",
  ];
  teamMemberAvatars: string[] = [];
  teamMembersList: TeamMember[] = [];

  constructor(
    private tasksService: TasksService,
    private teamMembersService: TeamMembersService
  ) {}

  ngOnInit(): void {
    this.getAllTeamMembers();
  }

  getAllTasks(categoryId: string) {
    this.tasksService.getAllTasks(categoryId).then(
      (data) => {
        this.tasksList = data;
        this.selectTeamMember();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeTask(taskId: string) {
    this.tasksService.removeTask(taskId).then(
      (data) => {
        this.getAllTasks(this.categoryId!);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllTeamMembers() {
    this.teamMembersService.getAllTeamMembers().then(
      (data) => {
        this.teamMembersList = data;
        this.getAllTasks(this.categoryId!);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectTeamMember() {
    this.teamMemberAvatars = [];
    this.tasksList.forEach((task) => {
      task.avatars = [];
      if (task.teamMemberIds) {
        task.teamMemberIds!.forEach((id) => {
          this.teamMembersList.map((element) => {
            if (element.id === id) {
              task.avatars!.push(element.avatar);
            }
          });
        });
      }
    });
  }
}
