import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.module';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FormationService } from 'src/app/services/formation-service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  courses: Course[] = [];

  constructor(
    public formationService: FormationService,
    public authService: AuthenticationService,
    public afStore: AngularFirestore,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.formationService.getFormationList().subscribe((res) => {
      let enrolled = [];
      this.afStore
        .collection('purchases')
        .valueChanges()
        .subscribe((purchases) => {
          let email = this.authService.userData._delegate.email;
          purchases.forEach((purchase: any) => {
            purchase.course.forEach((course) => {
              if (email == purchase.email) enrolled.push(course);
            });
          });
          this.courses = res.filter(
            (course) => !enrolled.map((e) => e.id).includes(course.id)
          );
        });

      this.cd.detectChanges();
    });
  }

  ngOnInit() {}

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }
}
