import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, forkJoin, lastValueFrom } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { CategoryTaskService } from 'src/app/services/category-task.service';
import { CategoryService } from 'src/app/services/category.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TaskMemberModel } from 'src/app/shared/models/team-member.model';

@Component({
  selector: 'app-create-category-task',
  templateUrl: './create-category-task.component.html',
  styleUrls: ['./create-category-task.component.scss']
})
export class CreateCategoryTaskComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe = new Subject<void>();
  readonly form: FormGroup;
  formType: string = "Create";
  private taskId: string | null = null;
  categoryList: Array<CategoryModel> = [];
  teamMembersList: Array<TaskMemberModel> = [];
  selectedCategoryTask: Array<TaskModel> = [];
  fileToUpload: File | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly categoryTaskService: CategoryTaskService,
    private readonly teamMemberService: TeamMemberService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      categoryId: [""],
      imageUrl: [""],
      teamMembersIds: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: ParamMap) => {
      this.taskId = params.get('id');
      this.formType = this.taskId ? "Edit" : "Create";
      this.fetchDetails();
    });
  }

  fetchDetails() {
    forkJoin({
      category: this.categoryService.getCategories(),
      teamMembers: this.teamMemberService.getTaskMembers(),
      categoryTask: this.categoryTaskService.getCategoryTask()
    }).pipe(
      takeUntil(this.ngUnsubscribe),
      tap(res => {
        this.categoryList = res.category ?? [];
        this.teamMembersList = res.teamMembers.map(x => ({ ...x, selected: false })) ?? [];
        this.selectedCategoryTask = res.categoryTask.filter(x => x.id === this.taskId) ?? [];

        if (this.formType === 'Edit') {
          this.patchCategoryValues();
          this.populateTeamMembers();
        } else {
          this.populateTeamMembers();
        }
      })
    ).subscribe()
  }

  fileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  createTeamMembers(teamMembersList: TaskMemberModel[]) {
    const arr = teamMembersList.map(member => {
      return new FormControl(member.selected);
    });
    return new FormArray(arr);
  }

  changedImage(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  private populateTeamMembers() {
    const categoryTask = this.selectedCategoryTask.find(x => x.id === this.taskId);
    const formArray = this.form.get('teamMembersIds') as FormArray;
    this.teamMembersList.forEach((member) => {
      formArray.push(
        new FormGroup({
          id: new FormControl(member.id),
          avatar: new FormControl(member.avatar),
          name: new FormControl(member.selected),
          selected: new FormControl(categoryTask?.teamMemberIds?.includes(member.id))
        })
      );
    });
  }

  get teamMembersControls() {
    return (this.form.get('teamMembersIds') as FormArray).controls;
  }

  private async patchCategoryValues() {
    const categoryTask = this.selectedCategoryTask.find(x => x.id === this.taskId);
    this.form.patchValue({
      name: categoryTask?.name,
      categoryId: categoryTask?.categoryId,
      imageUrl: categoryTask?.imageUrl
    });
  }

  async onCreate() {
    if (this.form.invalid) {
      return
    }
    const teamMembersArray = this.form.get('teamMembersIds') as FormArray;
    const teamMembersIds = teamMembersArray.value.filter((x: TaskMemberModel) => x.selected === true)
      .map((x: TaskMemberModel) => x.id);
    const payload = new FormData();
    if (this.fileToUpload) {
      payload.append('UPLOADCARE_PUB_KEY', ''); //Process env / secret 
      payload.append('filename', this.fileToUpload);
      const uuid = (await lastValueFrom(this.categoryTaskService.uploadCategoryImage(payload))).filename
      this.form.patchValue({
        imageUrl: uuid
      })
    }

    if (this.formType === "Create") {
      this.categoryTaskService.createCategoryTask({ ...this.form.value, teamMemberIds: teamMembersIds }).subscribe(() => this.router.navigate(["category", this.form.value.categoryId]))
    } else {
      this.categoryTaskService.updateCategoryTask({ ...this.form.value, teamMemberIds: teamMembersIds, id: this.taskId }).subscribe(() => this.router.navigate(["category", this.form.value.categoryId]))
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
