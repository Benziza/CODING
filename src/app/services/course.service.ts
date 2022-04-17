import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Course } from '../models/course.module';
import { AuthenticationService } from './authentication-service';
import { FormationService } from './formation-service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [];
  selectedCourse: Subject<Course> = new Subject<Course>();
  coursChanged$ = this.selectedCourse.asObservable();

  constructor(
    public formationService: FormationService,
    public authService: AuthenticationService,
    public afStore: AngularFirestore
  ) {
    this.formationService.getFormationList().subscribe((res) => {
      this.courses = res;
    });
  }

  getCourse(id: number): void {
    this.formationService.getFormationList().subscribe((res) => {
      this.selectedCourse.next(res.find((course) => course.id == id));
    });
  }
}
