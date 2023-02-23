import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { Category } from 'src/app/shared/models/category';
import { Task } from 'src/app/shared/models/task';
import { TeamMember } from 'src/app/shared/models/team-member';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  catSub = new Subscription();
  memberSub = new Subscription();
  categories: Category[] = [];
  task: Task | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl(''),
    teamMemberIds: new FormArray([]),
  });
  teamMembers: TeamMember[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private teamMemberService: TeamMemberService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        switchMap((res: any) => {
          return this.taskService.getTaskById(res.id);
        })
      )
      .subscribe((res: Task) => {
        this.task = res;
        this.getTeamMembers();
        this.taskFormGroup.patchValue({
          name: res.name,
          categoryId: res.categoryId.toString(),
        });
      });

    this.catSub = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        (this.categories = categories.slice(0, 10)).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      });
  }

  getTeamMembers() {
    this.memberSub = this.teamMemberService
      .getTeamMembers()
      .subscribe((teamMember: TeamMember[]) => {
        (this.teamMembers = teamMember), this.addCheckboxesToForm();
      });
  }

  private addCheckboxesToForm() {
    this.teamMembers.forEach((teamMember) => {
      if (
        this.task?.teamMemberIds?.some(
          (teamMemberId) => teamMemberId === teamMember.id
        )
      ) {
        this.teamMemberControls.push(new FormControl(true));
      } else {
        this.teamMemberControls.push(new FormControl(false));
      }
    });
  }

  get teamMemberControls() {
    return this.taskFormGroup.get('teamMemberIds') as FormArray;
  }

  addTeamMemeber(id: string) {
    let teamMember: string[] = this.teamMemberControls.value;
    if (teamMember && teamMember.includes(id)) {
      this.taskFormGroup.controls['teamMemberIds'].removeAt(
        teamMember.indexOf(id)
      );
    } else {
      this.teamMemberControls.push(new FormControl(id));
    }
  }

  submitHandler() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value;
    let name = this.taskFormGroup.controls['name'].value;
    let teamMemberIds: any[] = this.taskFormGroup.controls[
      'teamMemberIds'
    ].value
      .map((teamMemberIds, i) =>
        teamMemberIds === true ? (i + 1).toString() : null
      )
      .filter((i) => i !== null);

    if (categoryId && name) {
      this.taskService
        .editTask({
          name: name,
          categoryId: Number(categoryId),
          id: this.task?.id,
          teamMemberIds,
        })
        .subscribe((res) =>
          this.router.navigate(['/', 'categories', categoryId])
        );
    }
  }

  ngOnDestroy() {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.catSub) this.catSub.unsubscribe();
    if (!!this.memberSub) this.memberSub.unsubscribe();
  }
}
