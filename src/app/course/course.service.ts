import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  private courseURL = 'http://localhost:3000/course';
  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.courseURL)
      .pipe(catchError(this.handleError));
  }
  getCourse(id: number): Observable<Course> {
    const url = `${this.courseURL}/${id}`;
    return this.http.get<Course>(url).pipe(catchError(this.handleError));
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
