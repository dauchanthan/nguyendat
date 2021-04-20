import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './models/student';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private restAPI = 'http://localhost:3000';
  public totalStudent = 0;
  public behaviorSubject$ = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}

  public getStudents(): Observable<Student[]> {
    const url = `${this.restAPI}/students`;
    return this.http.get<Student[]>(url).pipe(catchError(this.handleError));
  }
  public getStudent(id: number): Observable<Student> {
    const url = `${this.restAPI}/students/${id}`;
    return this.http.get<Student>(url).pipe(catchError(this.handleError));
  }

  public addStudent(data: Student): Observable<Student[]> {
    const url = `${this.restAPI}/students`;
    return this.http
      .post<Student[]>(url, data)
      .pipe(catchError(this.handleError));
  }
  public deleteStudent(studentId: number): Observable<Student> {
    const url = `${this.restAPI}/students/${studentId}`;
    return this.http.delete<Student>(url).pipe(catchError(this.handleError));
  }
  public upDateStudent(
    studentId: number,
    student: Student
  ): Observable<Student> {
    const url = `${this.restAPI}/students/${studentId}`;
    return this.http
      .put<Student>(url, student)
      .pipe(catchError(this.handleError));
  }

  public setTotalStudent(total: number) {
    this.totalStudent = total;
    this.behaviorSubject$.next(total);
  }
  public incrementStudent() {
    this.totalStudent++;
    this.behaviorSubject$.next(this.totalStudent);
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
