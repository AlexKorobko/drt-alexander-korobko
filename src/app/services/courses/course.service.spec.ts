import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { Course } from 'src/types/course';
const coursesMock: Array<Course> = [{
  "id": 1,
  "title": "Modern Web Development",
  "duration": 5,
  "duration-unit": "day",
  "description": "HTML5, CSS3, ES6/JS and more"
},
  {
    "id": 2,
    "title": "Git",
    "duration": 3,
    "duration-unit": "day",
    "description": "Git and GitHub"
  },
  {
    "id": 3,
    "title": "Python",
    "duration": 5,
    "duration-unit": "day",
    "description": "Intro to Python"
  }];
describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ HttpClient ]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses', () => {
    spyOn(service, 'getCourses').and.returnValue(of(coursesMock));
    service.getCourses().subscribe((data) => {
      expect(data).toBe(coursesMock);
      expect(data.length).toEqual(3);
    });
  });
});
