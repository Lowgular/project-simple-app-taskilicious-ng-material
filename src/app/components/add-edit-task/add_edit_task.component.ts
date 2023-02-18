import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Category } from "src/app/models/category.model";
import { TeamMember } from "src/app/models/teamMember.model";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector: 'app-add-edit-task',
    templateUrl: './add_edit_task.component.html',
    styleUrls: ['./add_edit_task.component.scss']
}) 

export class AddEditTaskComponent implements OnInit, OnDestroy {
    name: string = '';
    categories: Category[] = [];
    teamMembers: TeamMember[] = [];
    categoryTeamMemberIds: number[] = [];
    selectedImage: any;
    selectedCategory: number = 0;
    taskId: number = 0;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getAllCategories();
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('id') && params['id'] > 0) {
                this.taskId = params['id'];
                this.getCategoryTaskById(this.taskId);
            }
        })
        this.getTeamMembers();
    }

    getAllCategories() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = [...Object.values(categories).filter(category => !!category.name == true)];
        });
    }

    getCategoryTaskById(taskId: number) {
        this.categoryService.getCategoryTaskById(taskId).subscribe( task => {
            const data: {id: number, categoryId: number, name: string, teamMemberIds: number[], imageUrl: string} = JSON.parse(JSON.stringify(task));
            this.name = data.name;
            this.selectedCategory = data.categoryId;
            if (data.hasOwnProperty('teamMemberIds') && data.teamMemberIds.length > 0) {
                this.categoryTeamMemberIds = [...data.teamMemberIds];
            }
            this.selectedImage = data.imageUrl;
        });
    }

    getTeamMembers() {
        this.categoryService.getTeamMembers().subscribe(teamMembers => {
            this.teamMembers = [...Object.values(teamMembers)];
            if (this.taskId > 0) {
                this.teamMembers.forEach(member => {
                    if (this.categoryTeamMemberIds.includes(member.id)) {
                        member['checked'] = true;
                    } else {
                        member['checked'] = false;
                    }
                });
            } else {
                this.teamMembers.forEach(member => {
                    member['checked'] = false;
                });
            }
        });
    }

    createTask() {
        const memberIds: number[] = [];
        this.teamMembers.filter(member => {
            if (member.checked == true) {
                memberIds.push(member.id);
                return member;
            } else {
                return;
            }
        });
        
        this.categoryService.addCategoryTask({name: this.name, categoryId: this.selectedCategory, teamMemberIds: memberIds, imageUrl: this.selectedImage}).subscribe(() => {});
        this.router.navigate(['/', 'categories', this.selectedCategory]);
    }

    updateTask() {
        const memberIds: number[] = [];
        this.teamMembers.filter(member => {
            if (member.checked == true) {
                memberIds.push(member.id);
                return member;
            } else {
                return;
            }
        });

        this.categoryService.editCategoryTask({name: this.name, categoryId: this.selectedCategory, teamMemberIds: memberIds}, this.taskId).subscribe(() => {});
        this.router.navigate(['/', 'categories', this.selectedCategory]);
    }

    onImageSelected(event:any) {
        const image = event.target.files[0];
        if (!!image) {
            const fileReader = new FileReader();
            fileReader.addEventListener('load', e => {
                this.selectedImage = e.target?.result;
            });
            fileReader.readAsDataURL(image);
        }
    }

    isTeamMemberSelected():boolean {
        return !!this.teamMembers.find(member => member.checked == true);
    }

    ngOnDestroy(): void {}
}