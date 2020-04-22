import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../../../types/course";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CourseFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public course: Course) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'title': '',
      'duration': 0,
      'duration-unit': '',
      'description': ''
    });

    if (this.course) {
      this.form.patchValue(this.course);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    const data = this.course ? {id: this.course.id, ...this.form.value} : this.form.value;
    this.dialogRef.close(data);
  }
}
