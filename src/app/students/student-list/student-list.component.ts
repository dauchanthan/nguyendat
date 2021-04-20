import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Student } from '../models/student';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  listStudents: Student[] = [];
  pages: number[];
  totalStudent = 0;
  name: string;
  currentNumber: number;

  constructor(
    private studentService: StudentsService,
    private routerService: Router,
    private activateRouter: ActivatedRoute
  ) {}
  ngOnInit() {
    this.showStudents();
    this.loadStudents();
    this.pages = [1, 2, 3];

    this.activateRouter.queryParams.subscribe((params) => {
      this.currentNumber = params['pageNumber'];
      console.log(this.currentNumber);
    });
  }

  showStudents() {
    this.studentService.getStudents().subscribe(
      (student) => {
        console.log(student);
        this.listStudents = student;
      },
      (error) => {
        this.studentService.handleError(error);
      }
    );
    this.studentService.behaviorSubject$.subscribe((total) => {
      this.totalStudent = total;
    });
  }
  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.studentService.setTotalStudent(data.length);
    });
  }
  addStudent() {
    this.routerService.navigate(['/students/addStudent']);
  }

  btnSearch() {
    if (this.name != '') {
      this.listStudents = this.listStudents.filter((res) => {
        // console.log(res);
        return res.name
          .toLocaleUpperCase()
          .match(this.name.toLocaleUpperCase());
      });
    } else {
      this.ngOnInit();
    }
  }
}
