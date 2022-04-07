import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.module';
import { Course } from 'src/app/models/course.module';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FormationService } from 'src/app/services/formation-service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  categories: Category[] = [];
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

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'All',
        image: '../../../assets/icon/all.png',
        active: true,
      },
      {
        id: 2,
        label: 'Front end',
        image: 'assets/icon/front.png',
        active: false,
      },
      {
        id: 3,
        label: 'Back end',
        image: 'assets/icon/back.png',
        active: false,
      },
      {
        id: 4,
        label: 'Devops',
        image: 'assets/icon/devops.png',
        active: false,
      },
    ];
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }
}
