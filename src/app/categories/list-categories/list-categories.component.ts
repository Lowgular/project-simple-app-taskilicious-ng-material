import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category/category.service";
import {Router} from "@angular/router";

interface Category {
  name: string;
  id: number;
}
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
        (data: any) => {
          this.categories = data;
        }
    );
  }

    editCategory(id: number) {
      this.router.navigate(['/categories/edit/' + id]);
    }

  detail(id: number) {
    this.router.navigate(['categories/' + id])
  }
}
