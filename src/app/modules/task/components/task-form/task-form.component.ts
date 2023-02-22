import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/app/modules/category/models/category";
import { CategoriesService } from "src/app/modules/category/services/categories/categories.service";
import { environment } from "src/environments/environment";
import { Task } from "../../models/task";
import { TaskResponse } from "../../models/task-response";
import { TeamMember } from "../../models/team-member";
import { TasksService } from "../../services/tasks/tasks.service";
import { TeamMembersService } from "../../services/team-members/team-members.service";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"],
})
export class TaskFormComponent implements OnInit {
  buttonTitle: string = "Create";
  taskForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;
  @Input("categoryId") categoryId: string | null = null;
  @Input("taskData") taskData: Task | undefined;
  @Output() status = new EventEmitter<TaskResponse>();
  categoriesList: Category[] = [];
  teamMembersList: TeamMember[] = [];
  selectedTeamMembers: string[] = [];
  selectedFile: File | null = null;
  fileName: string = "";

  constructor(
    private _formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private tasksService: TasksService,
    private teamMembersService: TeamMembersService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getAllTeamMembers();

    this.taskForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      categoryId: [this.categoryId, [Validators.required]],
      teamMemberIds: [""],
      file: [""],
      imageUrl: [""],
    });
    if (this.taskData) {
      this.fillForm(this.taskData);
      this.buttonTitle = "Submit";
    }
  }

  getCategories() {
    this.categoriesService.getAllCategories().then(
      (data) => {
        this.categoriesList = data;
      },
      (error) => {
        this.categoriesList = [];
      }
    );
  }

  getAllTeamMembers() {
    this.teamMembersService.getAllTeamMembers().then(
      (data) => {
        this.teamMembersList = data;
        if (this.taskData) {
          this.selectTeamMemberEdit();
        }
      },
      (error) => {
        this.teamMembersList = [];
      }
    );
  }

  fillForm(formData: any) {
    const formProperties = this.taskForm.value;
    const keys = Object.keys(formProperties);

    if (keys.length > 0) {
      for (let index = 0; index < keys.length; index++) {
        if (
          formData.hasOwnProperty(keys[index]) &&
          !Array.isArray(formData[keys[index]]) &&
          `${formData[keys[index]]}` != "null"
        ) {
          this.taskForm
            .get(`${keys[index]}`)!
            .setValue(`${formData[keys[index]]}`);
        }
      }
    }

    this.selectedTeamMembers = formData.teamMemberIds;
  }

  onSubmit() {
    this.taskForm.get("teamMemberIds")?.setValue(this.selectedTeamMembers);

    if (this.selectedFile) {
      let data = new FormData();
      data.append("file0", this.selectedFile, this.selectedFile.name);
      this.uploadTaskImage(data);
    } else {
      this.sendData();
    }
  }

  sendData() {
    if (this.taskData) {
      this.updateTask(String(this.taskData.id));
    } else {
      this.createTask();
    }
  }

  createTask() {
    this.errorMessage = null;

    this.tasksService.createTask(this.taskForm.value).then(
      (data) => {
        this.status.emit({
          message: "success",
          categoryId: this.taskForm.get("categoryId")?.value,
        });
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  updateTask(taskId: string) {
    this.errorMessage = null;

    this.tasksService.updateTask(taskId, this.taskForm.value).then(
      (data) => {
        this.status.emit({
          message: "success",
          categoryId: this.taskForm.get("categoryId")?.value,
        });
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  selectTeamMember(index: number) {
    this.teamMembersList[index].checked = !this.teamMembersList[index].checked;
    this.selectedTeamMembers = [];
    this.teamMembersList.forEach((element) => {
      if (element.checked) {
        this.selectedTeamMembers.push(element.id);
      }
    });
  }

  selectTeamMemberEdit() {
    this.selectedTeamMembers.forEach((memberId) => {
      this.teamMembersList.map((element) => {
        if (element.id === memberId) {
          element.checked = true;
        }
      });
    });
  }

  uploadTaskImage(file: any) {
    this.errorMessage = null;

    this.tasksService.uploadTaskImage(file).then(
      (data) => {
        const imageUrl: string = environment.IMGS_URL + data.file0 + "/";
        this.taskForm.get("imageUrl")?.setValue(imageUrl);
        this.sendData();
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }
}
