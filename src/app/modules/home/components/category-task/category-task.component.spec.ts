import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTaskComponent } from './category-task.component';

describe('CategoryTaskComponent', () => {
  let component: CategoryTaskComponent;
  let fixture: ComponentFixture<CategoryTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
