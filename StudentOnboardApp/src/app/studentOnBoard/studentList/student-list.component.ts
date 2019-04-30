import { Component, OnInit } from '@angular/core';

import { Student } from '../../models/Student';
import { StudentService } from '../../services/student.service';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  pageTitle = 'Student List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredStudents = this.listFilter ? this.performFilter(this.listFilter) : this.students;
  }

  filteredStudents: Student[] = [];
  students: Student[] = [];

  constructor(private studentService: StudentService, private alertService: AlertService) { }


  performFilter(filterBy: string): Student[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.students.filter((student: Student) =>
      student.studentName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      students => {
        this.students = students;
        this.filteredStudents = this.students;
      },
      error => this.errorMessage = <any>error
    );
  }

  deleteStudent(student: Student) {
    if (confirm(`do you really want to delete the student : ${student.studentName}`))
      this.studentService.deleteStudent(student.id).subscribe(
        () => this.onDelete(student.id),
        (error: any) => this.errorMessage = <any>error)
  }
  onDelete(id: number): void {
    this.studentService.getStudents().subscribe(
      (students: any) => {
        this.students = students;
        this.filteredStudents = students;
      },
      (error: any) => {
        this.alertService.error(error.error.message);
        this.errorMessage = <any>error
      }
    );
  }

  
}
