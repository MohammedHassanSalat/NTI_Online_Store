import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Pagination } from '../interfaces/pagination';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DescriptionPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  subscription: any;
  products: any[] = [];
  pagination: Pagination = {};
  imgDomain: string = '';
  search: string = '';
  page: number = 1;
  constructor(private _ProductsService: ProductsService, private _CartService: CartService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getProducts(16, this.page, undefined, this.search).subscribe((res) => {
      this.products = res.data;
      this.pagination = res.pagination
    })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => { alert('Product Added to cart') })
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts()
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }
}
