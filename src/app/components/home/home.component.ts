import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
    title: string = 'Welcome to Taskilicious';
    categories: Array<Category> = [];

    constructor(
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = [...Object.values(categories).filter(category => !!category.name == true)];
        });
    }

    onEdit(category:Category): void {
        this.router.navigate(['edit/', category.id]);
    }

    ngOnDestroy(): void {}
}
