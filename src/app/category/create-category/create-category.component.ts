import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  readonly form: FormGroup;
  formType: string = "Create";
  private categoryId: string | null = null;
  readonly ngUnsubscribe = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly router: Router) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: ParamMap) => {
      this.categoryId = params.get('id');
      this.formType = this.categoryId ? "Edit" : "Create";
      if (this.categoryId == null) return;
      this.categoryService.getCategoryById(this.categoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.form.setValue({ name: res.name });
      })
    });
  }

  createRecord() {
    if (this.form.invalid) {
      return;
    }
    this.categoryService.createCategory({
      ...this.form.value
    }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.router.navigate(['']));
  }

  updateRecord() {
    if (this.form.invalid) {
      return;
    }
    this.categoryService.updateCategory(
      { id: Number(this.categoryId), ...this.form.value }
    ).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
