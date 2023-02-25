import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { UploadService } from 'src/app/services/upload.service';
import { Category } from 'src/app/shared/models/category';
import { Task } from 'src/app/shared/models/task';
import { TeamMember } from 'src/app/shared/models/team-member';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  catSub = new Subscription();
  categories: Category[] = [];
  task: Task | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl(''),
    teamMemberIds: new FormArray([]),
    imageUrl: new FormControl(''),
  });
  teamMembers: TeamMember[] = [];
  taskId: string | null = null;
  imagePreview: string | undefined;
  fileToUpload: File | undefined;
  type: string = 'Create';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private teamMemberService: TeamMemberService,
    private uploadService: UploadService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.['id'])
      localStorage.setItem(
        'categoryId',
        this.router.getCurrentNavigation()?.extras.state?.['id']
      );
  }

  async ngOnInit(): Promise<void> {
    this.getCategories();
    this.teamMembers = await lastValueFrom(
      this.teamMemberService.getTeamMembers()
    );

    this.taskId = this.route.snapshot.params['id'];
    if (this.taskId) {
      this.getTaskById(this.taskId);
      this.type = 'Update';
    } else {
      this.type = 'Create';
      this.taskFormGroup.patchValue({
        name: 'New Task',
      });
      this.taskFormGroup.controls['categoryId'].setValue(
        localStorage.getItem('categoryId')
      );
      this.addCheckboxesToForm();
    }
  }

  async getTaskById(taskId: string) {
    const response = await lastValueFrom(this.taskService.getTaskById(taskId));
    if (response) {
      this.task = response;
      this.taskFormGroup.patchValue({
        name: response.name,
        categoryId: response.categoryId.toString(),
        imageUrl: response.imageUrl,
      });
      this.addCheckboxesToForm();
    }
  }

  getCategories() {
    this.catSub = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        (this.categories = categories.slice(0, 10)).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      });
  }

  get teamMemberControls() {
    return this.taskFormGroup.get('teamMemberIds') as FormArray;
  }

  private addCheckboxesToForm() {
    this.teamMembers.forEach((teamMember) => {
      if (
        this.task &&
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
      if (this.type === 'Create') {
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
      } else {
        this.taskService
          .editTask({
            name,
            categoryId: Number(categoryId),
            teamMemberIds,
            id: this.task?.id,
            imageUrl: imageUrl
              ? 'https://ucarecdn.com/' + imageUrl + '/'
              : undefined,
          })
          .subscribe((res) =>
            this.router.navigate(['/', 'categories', categoryId])
          );
      }
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
    if (!!this.catSub) this.catSub.unsubscribe();
  }
}
