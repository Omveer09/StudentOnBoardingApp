import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription} from 'rxjs';
import { first } from 'rxjs/operators';

import { Student } from '../../models/Student';
import { StudentService } from '../../services/student.service';

import { GenericValidator } from '../../shared/generic-validator';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit,  OnDestroy {
  //@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Student Edit';
  errorMessage: string;
  studentForm: FormGroup;
  
  isSave = true;
  isclicked = false;
  isDisabled = false ;
  isInternational: boolean = true;
  loading = false;
  currentUser : any;
  student = new Student();
  studentToDisplay = new Student();
  private sub: Subscription;


  get tags(): FormArray {
    return <FormArray>this.studentForm.get('tags');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService, 
    private alertService : AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      //onBoardNumber: ['', [Validators.required]],
      studentName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      documents: this.fb.group({
        domicileSubmitted: ['', [Validators.required]],
        birthCertificateSubmitted: ['', [Validators.required]],
        markSheetsSubmitted: ['', [Validators.required]],
        policeClearanceSubmitted: '',
        passportSubmitted: '',
        declarationSubmitted: ['', [Validators.required]]
      }),
      dob: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      lastClassScore: ''
    });

    // Read the student Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        const flag = params.get('flag');
        const boolFlag = JSON.parse(flag);
        this.getStudent(id, boolFlag);
        console.log('flag'+params.get('flag'));
      }
    );
    
    // monitor any change in notification formControl and reacting accordingly
    this.studentForm.get('category').valueChanges.subscribe(
      value => this.setDocumentsFilter(value)
    );
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getStudent(id: number, flag: boolean): void {
    
    this.studentService.getStudent(id)
      .subscribe(
        student=> this.displayStudent(student, flag),
        error => this.errorMessage = <any>error
      );
  }

  displayStudent(student: Student, flag : boolean): void {
    if (this.studentForm) {
      this.studentForm.reset();
    }
    this.studentToDisplay = student;

    if (this.studentToDisplay.id === 0 || this.studentToDisplay.id == null) {
      this.pageTitle = 'Add Student';
    } else {
      this.pageTitle = `Edit Student: ${this.studentToDisplay.studentName}`;
    }
    // Update the data on the form
    this.studentForm.patchValue({
      studentName: this.studentToDisplay.studentName,
      category: this.studentToDisplay.category,
      dob: this.studentToDisplay.dob,
      fatherName: this.studentToDisplay.fatherName,
      motherName: this.studentToDisplay.motherName,
      lastClassScore: this.studentToDisplay.lastClassScore
    });

    this.studentForm.setControl('documents', this.fb.group({
      domicileSubmitted: this.studentToDisplay.domicileSubmitted,
      birthCertificateSubmitted: this.studentToDisplay.birthCertificateSubmitted,
      markSheetsSubmitted: this.studentToDisplay.markSheetsSubmitted,
      policeClearanceSubmitted: this.studentToDisplay.policeClearanceSubmitted,
      passportSubmitted: this.studentToDisplay.passportSubmitted,
      declarationSubmitted: this.studentToDisplay.declarationSubmitted
    }))


    
    this.isSave = !flag
    if(!flag){
      //this.studentForm.disable();
    }
    console.log()
    this.isclicked = true;
  
  }

  setDocumentsFilter(value: string): void {
    console.log(value);
    const policeClearanceControl = this.studentForm.get('documents.policeClearanceSubmitted');
    const passportControl = this.studentForm.get('documents.policeClearanceSubmitted');
    if (value === 'international') {
      policeClearanceControl.setValidators(Validators.required);
      passportControl.setValidators(Validators.required);
      this.isInternational = true;
    }
    else {
      policeClearanceControl.clearValidators();
      passportControl.clearValidators();
      this.isInternational = false;
    }
    policeClearanceControl.updateValueAndValidity();
    passportControl.updateValueAndValidity();
  }

  deleteStudent(): void {
    if (this.student.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the student: ${this.student.studentName}?`)) {
        this.studentService.deleteStudent(this.student.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      return
    }
    this.loading = true;

    this.student.studentName = this.studentForm.get('studentName').value;
    this.student.category = this.studentForm.get('category').value;
    this.student.domicileSubmitted = this.studentForm.get('documents.domicileSubmitted').value;
    this.student.birthCertificateSubmitted = this.studentForm.get('documents.birthCertificateSubmitted').value;
    this.student.markSheetsSubmitted = this.studentForm.get('documents.markSheetsSubmitted').value;
    this.student.policeClearanceSubmitted = this.studentForm.get('documents.policeClearanceSubmitted').value;
    this.student.passportSubmitted = this.studentForm.get('documents.passportSubmitted').value;
    this.student.declarationSubmitted = this.studentForm.get('documents.declarationSubmitted').value;
    this.student.dob = this.studentForm.get('dob').value;
    this.student.fatherName = this.studentForm.get('fatherName').value;
    this.student.motherName = this.studentForm.get('motherName').value;
    this.student.lastClassScore = this.studentForm.get('lastClassScore').value;

    this.studentService.createStudent(this.student).
      pipe(first()).subscribe(
      (data:any) => {
        if(data && data.id){
        this.router.navigate(['/students']);
        this.alertService.success("student onboard is successful");
        this.loading = false;
      }
      else{
        this.alertService.error("student onboard is not successful");
        this.loading = false;
      }
      },
      (error:any) => {
         this.alertService.error(error.error.message);
        this.loading = false;
      })

  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.studentForm.reset();
    this.router.navigate(['/students']);
  }

  updateStudent(): void {
    if (this.studentForm.invalid || !this.studentForm.dirty) {
      return;
    }
    else{ 
    this.studentToDisplay.studentName = this.studentForm.get('studentName').value;
    this.studentToDisplay.category = this.studentForm.get('category').value;
    this.studentToDisplay.domicileSubmitted = this.studentForm.get('documents.domicileSubmitted').value;
    this.studentToDisplay.birthCertificateSubmitted = this.studentForm.get('documents.birthCertificateSubmitted').value;
    this.studentToDisplay.markSheetsSubmitted = this.studentForm.get('documents.markSheetsSubmitted').value;
    this.studentToDisplay.policeClearanceSubmitted = this.studentForm.get('documents.policeClearanceSubmitted').value;
    this.studentToDisplay.passportSubmitted = this.studentForm.get('documents.passportSubmitted').value;
    this.studentToDisplay.declarationSubmitted = this.studentForm.get('documents.declarationSubmitted').value;
    this.studentToDisplay.dob = this.studentForm.get('dob').value;
    this.studentToDisplay.fatherName = this.studentForm.get('fatherName').value;
    this.studentToDisplay.motherName = this.studentForm.get('motherName').value;
    this.studentToDisplay.lastClassScore = this.studentForm.get('lastClassScore').value;


      this.studentService.updateStudent(this.studentToDisplay).
            subscribe(
              () => this.router.navigate(['/students']),
              (error:any) => this.errorMessage = <any>error
            );
    }
  }

  onBack(){
    this.router.navigate(['/students']);
  }

    onCancel(){
     if(confirm(`Navigate away and lose all the changes to form`))
                   this.router.navigate(['/students']);
  }

}
