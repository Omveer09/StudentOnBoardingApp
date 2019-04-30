import { TestBed, async, inject } from '@angular/core/testing';

import { StudentEditGuard } from './student-edit.guard';

describe('StudentEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentEditGuard]
    });
  });

  it('should ...', inject([StudentEditGuard], (guard: StudentEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
