import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Student } from '../models/student';
import { StudentsService } from '../students.service';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activateRouteSv: ActivatedRoute,
    private studentService: StudentsService
  ) {}

  student: Student = null;
  students: Student[] = [];
  sub: Subscription;
  ngOnInit(): void {
    this.studentParams();
  }
  public studentParams() {
    this.sub = this.activateRouteSv.params.subscribe((data) => {
      let id: number = data.id;
      this.studentService.getStudent(id).subscribe((params: Student) => {
        this.student = params;
        console.log(this.student);
      });
    });
  }

  onEdit(studentId: number) {
    this.router.navigate(['/students', studentId, 'edit']);
  }
  onDelete(studentId: number) {
    // console.log(studentId);
    this.studentService.deleteStudent(studentId).subscribe((data) => {
      this.router.navigate(['students']);

      this.studentService.getStudents().subscribe((data) => {
        this.students = data;
        this.studentService.setTotalStudent(data.length);
      });
      // console.log(data);
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
