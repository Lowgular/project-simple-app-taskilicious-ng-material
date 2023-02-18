import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-add-edit-category',
    templateUrl: './add_edit_category.component.html',
    styleUrls: ['./add_edit_category.component.scss']
})

export class AddEditCategoryComponent implements OnInit, OnDestroy {
    name: string = '';
    categoryId: number = 0;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe( params => {
            if (params.hasOwnProperty('id') && params['id'] > 0) {
                this.categoryId = params['id'];
                this.getCategoryById(this.categoryId);
            }
        });
    }

    createCategory() {
        // Sometimes, it doesn't work & gives me error saying "Max number of elements reached for this resource!"
        this.categoryService.addCategory({name: this.name}).subscribe( () => {
            this.router.navigate(['']);
        });
    }
    
    editCategory(): void {
        this.categoryService.updateCategory(this.categoryId, this.name).subscribe( () => {
            this.router.navigate(['']);
        })
    }

    getCategoryById(id: number) {
        this.categoryService.getCategoryById(id).subscribe( category => {
            this.name = JSON.parse(JSON.stringify(category)).name;
        })
    }

    ngOnDestroy(): void {}
}
