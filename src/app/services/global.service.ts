import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  hostName: string = 'http://localhost:5005';
  authRoute: string = '/app/v1/auth';
  productsRoute: string = '/app/v1/products';
  cartRoute: string = '/app/v1/carts';
  orderRoute: string = '/app/v1/orders';
  wishlistRoute: string = '/app/v1/wishlist';
  reviewsRoute: string = '/app/v1/reviews';
  usersRoute: string = '/app/v1/users';
  productsImages: string = `${this.hostName}/products/`
  userImage: string = `${this.hostName}/users/`
  constructor() { }
}
