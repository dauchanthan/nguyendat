import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private courseService: CourseService) { }
  listCourse: Course[] = [];

  ngOnInit(): void {
    this.showCourse();

  }
  showCourse() {
    this.courseService.getCourses().subscribe(
      (course) => {
        this.listCourse = course;
        console.log(this.listCourse);
      },
      (error) => {
        this.courseService.handleError(error);
      }
    );
  }
}
