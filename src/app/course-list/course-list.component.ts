import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CourseService } from "../services/courses/course.service";
import { Course } from "../../types/course";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CourseFormComponent } from "../components/course-form/course-form.component";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseListComponent implements OnInit {

  courses: Course[];
  modal: MatDialogRef<CourseFormComponent>;

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    }, err => {
      console.log('Cannot get courses', err);
    });
  }

  onRemoveCourse(id: number) {
    const index = this.courses.findIndex(course => course.id === id);
    if (index > -1) {
      this.courses.splice(index, 1);
    }
  }

  onEditCourse(id: number) {
    const index = this.courses.findIndex(c => c.id === id);
    if (index > -1) {
      const course = this.courses[index];
      this.modal = this.dialog.open(CourseFormComponent, {
        data: course,
        maxWidth: '400px'
      });
      this.modal.afterClosed().subscribe(data => {
        if (data) {
          this.courses[index] = data;
        }
      });
    }
  }

  addCourse() {
    this.modal = this.dialog.open(CourseFormComponent, {
      maxWidth: '400px'
    });
    this.modal.afterClosed().subscribe(data => {
      if (data) {
        data.id = this.courses.length + 1;
        this.courses.push(data);
      }
    });
  }
}
