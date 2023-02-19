import { TestBed } from '@angular/core/testing';

import { CategoryTaskService } from './category-task.service';

describe('CategoryTaskService', () => {
  let service: CategoryTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
