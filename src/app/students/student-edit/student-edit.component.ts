import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  rfStudent: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  _id: number;
  //  key:string;
  ngOnInit(): void {
    this.rfStudent = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.onSubmit();
  }
  onSubmit() {
    this._id = +this.route.snapshot.paramMap.get('id');
    this.loadData(this._id);
  }
  private loadData(id) {
    this.studentService.getStudent(id).subscribe((data) => {
      console.log(data);
      for (const controlName in this.rfStudent.controls) {
        if (controlName) {
          this.rfStudent.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }
  private createNewData(): Student {
    const newStudent = {};
    for (const controlName in this.rfStudent.controls) {
      if (controlName) {
        newStudent[controlName] = this.rfStudent.controls[controlName].value;
      }
    }
    return newStudent as Student;
  }
  onUpdate() {
    this.studentService
      .upDateStudent(this._id, this.createNewData())
      .subscribe((data) => {
        if (data) {
          alert('success');
          this.router.navigate(['students']);
        }
      });
  }
}
