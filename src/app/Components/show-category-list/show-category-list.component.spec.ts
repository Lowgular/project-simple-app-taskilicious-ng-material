import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoryListComponent } from './show-category-list.component';

describe('ShowCategoryListComponent', () => {
  let component: ShowCategoryListComponent;
  let fixture: ComponentFixture<ShowCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
