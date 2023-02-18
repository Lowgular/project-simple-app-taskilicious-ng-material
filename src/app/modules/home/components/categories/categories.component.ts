import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, of, Subject, takeUntil } from "rxjs";
import { CategoriesList } from "src/app/shared/models/categories-list.model";
import { CategoriesService } from "../../../../core/services/categories.service";

@Component({
  selector: "app-categories",
  styleUrls: ["./categories.component.scss"],
  templateUrl: "./categories.component.html",
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CategoriesComponent implements OnInit {
  public categoriesList: CategoriesList[] = [];
  public isLoading: boolean = false;
  public sortedCategories: CategoriesList[] = [];
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.isLoading = true;
    this.categoriesService
      .getCategories()
      .pipe(
        takeUntil(this._destroyed$),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res: CategoriesList[]) => {
        this.categoriesList = res;
        this.sortByName("asc");
      });
  }

  public addCategory(): void {
    this.router.navigate(["/category/0"]);
  }

  public editCategory(id: string): void {
    this.router.navigate([`/category/${id}`]);
  }

  public sortByName(order: "asc" | "desc"): void {
    this.sortedCategories = this.categoriesList
      .filter((category) => category.name !== null)
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return order === "asc" ? comparison : -comparison;
      });
  }

  public navigateToCategoryDetail(id: string): void {
    this.router.navigate([`/categories/${id}`]);
  }
}
