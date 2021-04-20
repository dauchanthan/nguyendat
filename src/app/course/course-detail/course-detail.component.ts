import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activateRouteService: ActivatedRoute,
    private courseService: CourseService
  ) {}

  course: Course = null;
  sub: Subscription;

  ngOnInit(): void {
    this.courseParams();
  }
  courseParams() {
    this.sub = this.activateRouteService.params.subscribe((data) => {
      let id: number = data.id;
      this.courseService.getCourse(id).subscribe((params: Course) => {
        this.course = params;
        console.log(this.course);
      });
    });
  }

  goNext() {
    let nextId = +this.activateRouteService.snapshot.paramMap.get('id');
    this.router.navigate(['/course', nextId + 1]);
  }
  goPrev() {
    const prevId = +this.activateRouteService.snapshot.paramMap.get('id');
    this.router.navigate(['/course', prevId - 1]);
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
