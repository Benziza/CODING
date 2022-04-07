import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/models/course.module';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() item: Course;

  @Output() clicked = new EventEmitter();
}
