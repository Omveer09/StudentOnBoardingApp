import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StudentData } from './student-data';

import { StudentListComponent } from './studentList/student-list.component';
import { StudentDetailComponent } from './studentDetail/student-detail.component';
import { StudentEditComponent } from './studentEdit/student-edit.component';
import { StudentEditGuard } from './studentEdit/student-edit.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(StudentData),
    HttpClientModule,
    RouterModule.forChild([
      { path: 'students', component: StudentListComponent },
      { path: 'students/:id',component: StudentDetailComponent },
      {
        path: 'students/:id/:flag/edit',
        canDeactivate: [StudentEditGuard],
        component: StudentEditComponent
      }
    ])
  ],
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentEditComponent
  ]
})
export class StudentModule { 

}
