import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { StudentEditComponent } from './student-edit.component';

@Injectable({
  providedIn: 'root'
})
export class StudentEditGuard implements CanDeactivate<StudentEditComponent> {
  canDeactivate(component: StudentEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.studentForm.dirty) {
      const studentName = component.studentForm.get('studentName').value || 'New Student';
      return true;
    }
    return true;
  }
}
