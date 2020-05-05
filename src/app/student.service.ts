import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Student, students } from './data-model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getStudents(): Observable<Student[]> {
    return of(students).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateStudent(student: Student): Observable<Student> {
    const oldStudent = students.find(s => s.id === student.id);
    const newStudent = Object.assign(oldStudent, student); // Demo: mutate cached student
    return of(newStudent).pipe(delay(this.delayMs)); // simulate latency with delay
  }
}
