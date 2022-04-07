import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item.module';
import { Course } from 'src/app/models/course.module';
import { CartService } from 'src/app/services/cart.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: number;
  course: Course;

  constructor(
    private activateRouter: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService,
    private toastCtrl: ToastController
  ) {
    this.id = +this.activateRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.course = this.courseService.getCourse(this.id);
  }

  addItemToCart() {
    const cartItem: CartItem = {
      id: this.course.id,
      name: this.course.title,
      price: this.course.price,
      image: this.course.image,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Course added to the cart',
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });
    toast.present();
  }
}
