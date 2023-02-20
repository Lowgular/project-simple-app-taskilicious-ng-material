import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent implements OnInit {
  title: string = "Create Category";

  constructor(private _location: Location) {}

  ngOnInit(): void {}

  formResponse(event: string) {
    console.log(event);
    if (event === "success") {
      this._location.back();
    }
  }
}
