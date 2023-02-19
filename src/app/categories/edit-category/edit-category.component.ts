import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  name: any;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCategoryById();
  }

  getCategoryById() {
    this.categoryService.getCategoryById(parseFloat(this.id)).subscribe(
        (data: any) => {
          this.name = data.name;
        }
    );
  }

  editCategory(value: any) {
    console.log(value);
    this.categoryService.updateCategory(value, this.id).subscribe(
        () => {
          this.router.navigate(['/']);
        }
    )
  }
}
