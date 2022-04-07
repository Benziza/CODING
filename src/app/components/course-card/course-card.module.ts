import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CourseCardComponent } from './course-card.component';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [CourseCardComponent],
})
export class CourseCardModule {}
