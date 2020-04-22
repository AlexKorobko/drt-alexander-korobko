import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertModule } from './_alert';

import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { HttpClientModule } from "@angular/common/http";
import { CourseFormComponent } from './components/course-form/course-form.component';
import { MaterialModule } from "./material-module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    AboutComponent,
    CourseListComponent,
    CourseComponent,
    CourseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    CourseFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
