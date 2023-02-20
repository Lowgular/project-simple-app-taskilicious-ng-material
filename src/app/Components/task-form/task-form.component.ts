import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { ICategory } from "src/app/Models/icategory";
import { ITask } from "src/app/Models/iTask";
import { ITeamMember } from "src/app/Models/iteam-member";
import { CategoryService } from "src/app/Services/CategoryService/category.service";
import { TaskService } from "src/app/Services/TaskService/task.service";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"],
})
export class TaskFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<ITask>();
  categories: ICategory[] = [];
  buttonAction: string = "Create";
  task: ITask;
  teamMembers: ITeamMember[];
  taskForm: FormGroup;
  checkedItems: boolean[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.task = { id: "", name: "", categoryId: "", teamMemberIds: [] };
    this.teamMembers = [{ name: "", id: "", avatar: "" }];

    this.taskForm = this.fb.group({
      taskName: this.fb.control("", Validators.required),
      category: this.fb.control("", Validators.required),
      teamMem: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.setFormValues();
    this.getCategoryList();
    this.getTeamMembers();
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe({
      next: (obs) => {
        this.categories = obs;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // work in editForm
  setFormValues() {
    const taskId = this.activatedRoute.snapshot.paramMap.get("id");

    if (taskId) {
      this.buttonAction = "Update";

      this.taskService.getTaskById(taskId).subscribe({
        next: (obs) => {
          this.task = obs;

          //set task name
          if (obs.name) {
            this.taskForm.get("taskName")?.setValue(obs.name);
          }

          // set category value
          this.taskForm.get("category")?.setValue(obs.categoryId);

          //set TeamMembers Value
          const teamMemArray = this.taskForm.get("teamMem") as FormArray;
          if (obs.teamMemberIds) {
            obs.teamMemberIds.forEach((member) => {
              const newMember = this.fb.control(member);
              teamMemArray.push(newMember);
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getTeamMembers() {
    this.taskService.getTeamMembers().subscribe({
      next: (obs) => {
        this.teamMembers = obs;
        this.checkedItems = new Array(obs.length).fill(false);

        //check the existed members
        obs.forEach((member) => {
          if (this.task.teamMemberIds?.includes(member.id)) {
            this.checkedItems[parseInt(member.id) - 1] = true;
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCheckboxChange(event: MatCheckboxChange, index: number) {
    const teamMemArray = this.taskForm.get("teamMem") as FormArray;
    this.checkedItems[index] = event.checked;
    const selectedItemId = event.source.value;
    //console.log("formValuesbefor",teamMemArray.value)
    //update taskTeamMembers
    const taskTeamMemberIds = this.task.teamMemberIds;
    if (taskTeamMemberIds) {
      if (
        taskTeamMemberIds?.includes(selectedItemId) &&
        event.checked == false
      ) {
        const itemIndexInTaskMemIds = taskTeamMemberIds.indexOf(selectedItemId);
        taskTeamMemberIds.splice(itemIndexInTaskMemIds, 1);

        const selectedItemIdIndexInArray = teamMemArray.controls.findIndex(
          (control) => control.value == selectedItemId
        );
        teamMemArray.removeAt(selectedItemIdIndexInArray);
      }

      if (
        event.checked == true &&
        !taskTeamMemberIds?.includes(selectedItemId)
      ) {
        taskTeamMemberIds?.push(selectedItemId);
        const newMember = this.fb.control(selectedItemId);
        teamMemArray.push(newMember);
      }
    }
  }

  onSubmit() {
    const categoryId = this.taskForm.get("category")?.value;
    const taskName = this.taskForm.get("taskName")?.value;
    const teamMembers = this.taskForm.get("teamMem")?.value;

    const newTask: ITask = {
      name: taskName,
      categoryId: categoryId,
      id: this.task.id,
      teamMemberIds: teamMembers
    };
    this.formSubmit.emit(newTask);
  }
}
