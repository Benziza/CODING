import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Course } from '../models/course.module';
import { AuthenticationService } from './authentication-service';
import { FormationService } from './formation-service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [];

  constructor(
    public formationService: FormationService,
    public authService: AuthenticationService,
    public afStore: AngularFirestore
  ) {
    this.formationService.getFormationList().subscribe((res) => {
      this.courses = res;
      console.log(res);
    });
  }

  getCourse(id: number): Course {
    return this.courses.find((course) => course.id === id);
  }
}
