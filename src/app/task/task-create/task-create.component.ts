import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { TeamMember } from 'src/app/shared/models/team-member';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  memberSub = new Subscription();
  categories: Category[] = [];
  taskFormGroup = new FormGroup({
    name: new FormControl('New Task', [Validators.required]),
    categoryId: new FormControl(''),
    teamMembersIds: new FormArray([]),
  });
  teamMembers: TeamMember[] = [];

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private teamMemberService: TeamMemberService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.['id'])
      localStorage.setItem(
        'categoryId',
        this.router.getCurrentNavigation()?.extras.state?.['id']
      );
  }

  ngOnInit(): void {
    this.sub = this.categoryService.getCategories().subscribe((categories) => {
      (this.categories = categories.slice(0, 10)).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
    this.taskFormGroup.controls['categoryId'].setValue(
      localStorage.getItem('categoryId')
    );

    this.memberSub = this.teamMemberService
      .getTeamMembers()
      .subscribe((teamMembers: TeamMember[]) => {
        (this.teamMembers = teamMembers),
          this.addCheckboxesToForm();
      });
  }

  submitHandler() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value;
    let name = this.taskFormGroup.controls['name'].value;
    let teamMembersIds: any[] = this.taskFormGroup.controls[
      'teamMembersIds'
    ].value
      .map((teamMemberIds, i) =>
        teamMemberIds === true ? (i + 1).toString() : null
      )
      .filter((i) => i !== null);

    if (categoryId && name && teamMembersIds) {
      this.taskService
        .createTask({
          name,
          categoryId: Number(categoryId),
          teamMembersIds,
        })
        .subscribe((res) =>
          this.router.navigate(['/', 'categories', categoryId])
        );
    }
  }

  get teamMembersControls() {
    return this.taskFormGroup.get('teamMembersIds') as FormArray;
  }

  private addCheckboxesToForm() {
    this.teamMembers.forEach(() =>
      this.teamMembersControls.push(new FormControl(false))
    );
  }

  addTeamMemeber(id: string) {
    let teamMember: string[] = this.teamMembersControls.value;
    if (teamMember && teamMember.includes(id)) {
      this.taskFormGroup.controls['teamMembersIds'].removeAt(
        teamMember.indexOf(id)
      );
    } else {
      this.teamMembersControls.push(new FormControl(id));
    }
  }

  ngOnDestroy() {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.memberSub) this.memberSub.unsubscribe();
  }
}
