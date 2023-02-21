import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/app/modules/category/models/category";
import { CategoriesService } from "src/app/modules/category/services/categories/categories.service";
import { Task } from "../../models/task";
import { TaskResponse } from "../../models/task-response";
import { TasksService } from "../../services/tasks/tasks.service";

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

  constructor(
    private _formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.getCategories();

    this.taskForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      categoryId: [this.categoryId, [Validators.required]],
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
  }

  onSubmit() {
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
}
