import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { CartService } from '../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,ReactiveFormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: any;
  cart: any = {};
  productsLength: number = 0;
  productImage: string = '';
  taxPrice: number = 100;
  couponError: string = '';
  couponForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })
  constructor(private _AuthService: AuthService,
              private _GlobalService: GlobalService,
              private _CartService: CartService,
              private _Router: Router,
              private _OrdersService: OrdersService) { }

  loadCart() {
    this.subscription = this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cart = res.data
        this.productsLength = res.lenght
      }, error: (err) => { }
    })
  }

  removeItem(itemId: string) {
    this._CartService.removeProductFromCart(itemId).subscribe({
      next: (res) => {
        this.loadCart();
        alert('product removed from cart');
      }, error: (err) => { }
    })
  }

  addCoupon(formData: FormGroup) {
    this._CartService.applyCoupon(formData.value).subscribe({
      next: (res) => {
        this.loadCart()
      }, error : (err) => { this.couponError = err.error.message }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        alert('cart cleared')
        this._Router.navigate(['/home'])
      }, error: (err) => { }
    })
  }

  createOrder() {
    this._OrdersService.createOrder().subscribe({
      next: (res) => {
        alert('order created');
        this._Router.navigate(['/myOrders']);
      }, error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
