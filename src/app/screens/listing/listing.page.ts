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
      this.courses = res;
      this.cd.detectChanges();
      console.log(res);
    });
  }

  ngOnInit() {}

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }
}
