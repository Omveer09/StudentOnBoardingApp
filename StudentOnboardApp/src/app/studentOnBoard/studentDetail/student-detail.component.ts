import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from '../../models/Student';
import { StudentService } from '../../services/student.service';

@Component({
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  pageTitle = 'student Detail';
  errorMessage = '';
  student: Student | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getStudent(id);
    }
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(
      student => this.student = student,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/students']);
  }

}
