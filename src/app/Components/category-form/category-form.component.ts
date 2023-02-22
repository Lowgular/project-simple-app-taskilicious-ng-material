import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryForm = new FormControl("", Validators.required);
  buttonAction : string = 'Create';
  inputValue : string = '';

  @Output() formSubmit = new EventEmitter<ICategory>();

  category : ICategory = {name: ''};

  constructor(private activatedRoute : ActivatedRoute, private categoryService : CategoryService) { 
  }

  ngOnInit(): void {
    this.getCategoryById();
  }

  onSubmit() {
    if(this.categoryForm.value) {
      const newCategory : ICategory = {
        name: this.categoryForm.value,
        id: this.category.id
      };
      this.formSubmit.emit(newCategory);
    }
  }

  getCategoryById() {
    const categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if(categoryId != null) {
      this.buttonAction = 'Submit';

      this.categoryService.getCategoryByID(categoryId).subscribe({
        next: (obs) => {
          this.category = obs;
          this.categoryForm.setValue(obs.name);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
