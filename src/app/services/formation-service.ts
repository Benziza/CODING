import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from '../models/course.module';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  constructor(private firestore: Firestore) {}

  // Get List
  getFormationList() {
    const notesRef = collection(this.firestore, 'courses');
    return collectionData(notesRef) as Observable<Course[]>;
  }
}
