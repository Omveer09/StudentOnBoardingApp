import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Student } from '../models/Student';

export class StudentData implements InMemoryDbService {

  createDb() {
    const students: Student[] = [
      {
        'id' : 1,
        'onBoardNumber' : 100,
        'studentName': 'Akash',
        'category': 'international',
        'domicileSubmitted': true,
        'birthCertificateSubmitted': true,
        'markSheetsSubmitted': true,
        'policeClearanceSubmitted' : true,
        'passportSubmitted' : true,
        'declarationSubmitted' : true,
        'dob' : '1990-03-11',
        'fatherName' : 'Mukesh',
        'motherName' : 'Nita',
        'lastClassScore' : 58,
      },
      {
        'id' : 2,
        'onBoardNumber' : 100,
        'studentName': 'Akhilesh',
        'category': 'local',
        'domicileSubmitted': true,
        'birthCertificateSubmitted': true,
        'markSheetsSubmitted': true,
        'policeClearanceSubmitted' : true,
        'passportSubmitted' : true,
        'declarationSubmitted' : true,
        'dob' : '1990-03-11',
        'fatherName' : 'Mukesh',
        'motherName' : 'Nita',
        'lastClassScore' : 58,
      }
      
    ];
    return { students };
  }
}
