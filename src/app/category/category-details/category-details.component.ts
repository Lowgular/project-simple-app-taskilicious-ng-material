import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { Category } from 'src/app/shared/models/category';
import { Task } from 'src/app/shared/models/task';
import { TeamMember } from 'src/app/shared/models/team-member';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  memberSub = new Subscription();
  category: Category | undefined;
  tasks: Task[] = [];
  displayedColumns: string[] = [
    'image',
    'name',
    'categoryId',
    'teamMembers',
    'edit',
    'remove',
  ];
  teamMembers: TeamMember[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private teamMemberService: TeamMemberService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        switchMap((res: any) => {
          return this.categoryService.getCategoryById(res.id);
        })
      )
      .subscribe((res: Category) => {
        this.category = res;
        this.getTasks();
      });
  }

  getTasks() {
    if (!!this.category?.id)
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks.filter(
          (task: Task) => task.categoryId == Number(this.category?.id)
        );
        this.getTeamMembers();
      });
  }

  getTeamMembers() {
    this.memberSub = this.teamMemberService
      .getTeamMembers()
      .subscribe((teamMember: TeamMember[]) => {
        this.teamMembers = teamMember;
      });
  }

  getTeamMemberImage(memberId: string): string {
    const teamMember = this.teamMembers.find(
      (member) => member.id === memberId
    );
    return teamMember ? teamMember.avatar : '';
  }

  deleteTask(task: any) {
    this.taskService.deleteTaskById(task.id).subscribe(() => {
      this.getTasks();
    });
  }

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.memberSub) this.memberSub.unsubscribe();
  }
}
