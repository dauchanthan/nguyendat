import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

import { Student } from '../models/student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  rfStudent: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.rfStudent = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }
  onSubmit() {
    const newStudent = {};
    for (const controlName in this.rfStudent.controls) {
      if (controlName) {
        newStudent[controlName] = this.rfStudent.controls[controlName].value;
      }
    }
    this.studentService.addStudent(newStudent as Student).subscribe(
      (data) => {
        console.log(data);
        this.studentService.incrementStudent();
        // this.router.navigate(['students']);
      },
      (error) => {
        this.studentService.handleError(error);
      }
    );
    this.rfStudent.reset();
  }

}
