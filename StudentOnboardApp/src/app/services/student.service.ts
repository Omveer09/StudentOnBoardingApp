import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = '/api/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getStudent(id: number): Observable<Student> {
    if (id === 0) {
      return of(this.initializeStudent());
    }
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url)
      .pipe(
        tap(data => console.log('getStudent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );

  }

  createStudent(student: Student): Observable<Student> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    student.id = null;
    return this.http.post<Student>(this.studentsUrl, student, { headers: headers })
      .pipe(
        tap(data => console.log('createStudent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteStudent(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteStudent: ' + id)),
        catchError(this.handleError)
      );
  }

  updateStudent(student: Student): Observable<Student> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.put<Student>(url, student, { headers: headers })
      .pipe(
        tap(() => console.log('updateStudent: ' + student.id)),
        // Return the Student on an update
        map(() => student),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeStudent(): Student {
    // Return an initialized object
    return {
      id : 0,
      onBoardNumber : null,
      studentName: null,
      category: null,
      domicileSubmitted: null,
      birthCertificateSubmitted: null,
      markSheetsSubmitted: null,
      policeClearanceSubmitted : null,
      passportSubmitted : null,
      declarationSubmitted : null,
      dob : null,
      fatherName : null,
      motherName : null,
      lastClassScore : null,
    };
  }
}
