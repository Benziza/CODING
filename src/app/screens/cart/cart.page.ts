import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.module';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  isLoggedIn: boolean = false;
  userLoggedIn: string;
  titleFireBase: String;
  totalName: String;
  isClicked: boolean = false;

  constructor(
    private authService: AuthClientService,
    private cartService: CartService,
    private alertCtrl: AlertController,
    private store: AngularFirestore
  ) {}

  async ngOnInit() {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.userLoggedIn = auth.email;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.cartItems$ = this.cartService.getCart();
    if (this.isClicked == true) {
      this.cartItems$ = new Observable<CartItem[]>();
      this.isClicked = false;
    }
    this.totalAmount$ = this.cartService.getTotalAmount();
    this.cartService.getNames().subscribe((value) => (this.totalName = value));
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Remove',
      message: 'Are you sure you want to remove?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.cartService.removeItem(item.id),
        },
        {
          text: 'No',
        },
      ],
    });
    alert.present();
  }

  async add() {
    const alert = await this.alertCtrl.create({
      header: 'Enroll',
      message: 'Are you sure you want to enroll?',
      buttons: [
        {
          text: 'Yes',
          handler: async () =>
            this.store.collection('purchases').add({
              email: this.userLoggedIn,
              course: this.totalName || null,
            }),
        },
        {
          text: 'No',
        },
      ],
    });
    alert.present();
  }
}
