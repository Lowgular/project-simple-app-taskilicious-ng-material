import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../service/category/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  addCategory(category: NgForm) {
    this.router.navigate(['/']);

    this.categoryService.addCategory(category).subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate(['/']);
        }
    );
  }
}
