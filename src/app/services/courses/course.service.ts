import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from "../../../types/course";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:4243/courses');
  }
}
