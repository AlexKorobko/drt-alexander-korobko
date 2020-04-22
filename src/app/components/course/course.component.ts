import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from "../../../types/course";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removeCourse() {
    this.remove.emit(this.course.id);
  }

  editCourse() {
    this.edit.emit(this.course.id);
  }
}
