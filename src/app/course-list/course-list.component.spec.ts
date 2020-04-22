import { CourseFormComponent } from './../components/course-form/course-form.component';
import { MaterialModule } from './../material-module';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from './../services/courses/course.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/types/course';
import { CourseListComponent } from './course-list.component';
import { of } from 'rxjs';

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

class MockCourseService {
  getCourses() {
    return of(JSON.parse(JSON.stringify(coursesMock)));
  }
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let dialog: MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule],
      declarations: [CourseListComponent, CourseFormComponent],
      providers: [{provide: CourseService, useClass: MockCourseService}, MatDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    component.courses = coursesMock;
    fixture.detectChanges();
  });

  it('should create component with 3 courses', () => {
    expect(component).toBeTruthy();
    expect(component.courses).toEqual(coursesMock);
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.courses.length).toEqual(3);
    });
  });

  it('should add element to courses list', () => {
    expect(component.courses.length).toEqual(3);
    const dialogSpy = spyOn<any>(component.dialog, 'open').and.returnValue({afterClosed: () => of(coursesMock[0])});
    const courseSpy = spyOn<any>(component, 'addCourse').and.callThrough();
    component.addCourse();
    expect(courseSpy).toHaveBeenCalled();
    expect(component.dialog.open).toHaveBeenCalled();
    component.dialog.open(CourseFormComponent).afterClosed().subscribe((data) => {
      expect(data).toBe(coursesMock[0]);
      fixture.detectChanges();
    });
    expect(dialogSpy).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(component.courses.length).toBeGreaterThan(3);
    });
  });

  it('should remove element from courses list', () => {
    expect(component.courses.length).toEqual(3);
    const courseSpy = spyOn<any>(component, 'onRemoveCourse').and.callThrough();
    component.onRemoveCourse(1);
    expect(courseSpy).toHaveBeenCalled();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.courses.length).toBeLessThan(3);
    });
  });
});
