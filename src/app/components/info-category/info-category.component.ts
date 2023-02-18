import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, Event, NavigationEnd } from "@angular/router";
import { Category } from "src/app/models/category.model";
import { CategoryTask } from "src/app/models/task.model";
import { TeamMember } from "src/app/models/teamMember.model";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector: 'app-info-category',
    templateUrl: './info-category.component.html',
    styleUrls: ['./info-category.component.scss']
})

export class InfoCategoryComponent implements OnInit, OnDestroy {
    category: Category = {id: 0, name: ''};
    categoryTasks: Array<CategoryTask> = [];
    teamMembers: TeamMember[] = [];
    categoryId: number = 0;
    tableColumns = ['image', 'name', 'categoryId', 'teamMembers', 'edit', 'remove'];

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private router: Router
    ) {
        this.router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {
                this.getCategoryTasks();
                this.getTeamMembers();
            }
        })
    }

    ngOnInit(): void {
        this.route.params.subscribe( params => {
            if (params.hasOwnProperty('id') && params['id'] > 0) {
                this.categoryId = params['id'];
                this.getCategoryById();
            }
        });
    }

    getCategoryById() {
        this.categoryService.getCategoryById(this.categoryId).subscribe( category => {
            this.category = {...JSON.parse(JSON.stringify(category))};
        });
    }

    getCategoryTasks() {
        this.categoryService.getCategoryTasks().subscribe ( tasks => {
            this.categoryTasks = [...Object.values(tasks).filter( task => task.categoryId == this.categoryId)];
            console.log(this.categoryTasks);
            
        });
    }

    getTeamMembers() {
        this.categoryService.getTeamMembers().subscribe(teamMembers => {
            this.teamMembers = [...Object.values(teamMembers)];
        });
    }

    getMemberAvatarById(memberId: number) {
        return this.teamMembers.find(member => member.id == memberId)?.avatar;
    }

    removeTask(taskId: number) {
        this.categoryService.deleteCategoryTask(taskId).subscribe(() => {
            this.getCategoryTasks();
        });
    }

    ngOnDestroy(): void {
        
    }
}
