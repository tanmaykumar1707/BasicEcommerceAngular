import { Component, OnInit, Input } from '@angular/core';
import { Products_Model } from '../models/product-model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input ('p') p :Products_Model;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.p);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.p);
  }
  // getQuantity(){
  //   if(!this.shoppingCart) return 0;
  //   let item = this.shoppingCart.items[this.p.key];
  //   return item ? item.quantity:0;
  // }


}
