import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { TeamMember } from 'src/app/shared/models/team-member';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

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
    teamMemberIds: new FormArray([]),
    imageUrl: new FormControl(''),
  });
  teamMembers: TeamMember[] = [];
  imagePreview: string | undefined;
  fileToUpload: File | undefined;

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private teamMemberService: TeamMemberService,
    private uploadService: UploadService,
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
      .subscribe((teamMember: TeamMember[]) => {
        (this.teamMembers = teamMember), this.addCheckboxesToForm();
      });
  }

  get teamMemberControls() {
    return this.taskFormGroup.get('teamMemberIds') as FormArray;
  }

  private addCheckboxesToForm() {
    this.teamMembers.forEach(() =>
      this.teamMemberControls.push(new FormControl(false))
    );
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

  async submitHandler() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('UPLOADCARE_PUB_KEY', environment.imageApiPublicKey);
      formData.append('filename', this.fileToUpload);
      const uuid = (
        await lastValueFrom(this.uploadService.uploadImage(formData))
      ).filename;
      this.taskFormGroup.patchValue({
        imageUrl: uuid,
      });
    }

    let categoryId = this.taskFormGroup.controls['categoryId'].value;
    let name = this.taskFormGroup.controls['name'].value;
    let teamMemberIds: any[] = this.taskFormGroup.controls[
      'teamMemberIds'
    ].value
      .map((teamMemberIds, i) =>
        teamMemberIds === true ? (i + 1).toString() : null
      )
      .filter((i) => i !== null);

    let imageUrl =
      this.taskFormGroup.controls['imageUrl'].value !== ''
        ? this.taskFormGroup.controls['imageUrl'].value
        : undefined;

    if (categoryId && name && teamMemberIds) {
      this.taskService
        .createTask({
          name,
          categoryId: Number(categoryId),
          teamMemberIds,
          imageUrl: imageUrl
            ? 'https://ucarecdn.com/' + imageUrl + '/'
            : undefined,
        })
        .subscribe((res) =>
          this.router.navigate(['/', 'categories', categoryId])
        );
    }
  }

  handleImageInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file) {
        this.fileToUpload = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
      }
    } else {
      input.value = '';
    }
  }

  ngOnDestroy() {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.memberSub) this.memberSub.unsubscribe();
  }
}
