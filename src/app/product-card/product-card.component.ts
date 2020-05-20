import { ShoppingCartService } from './../services/shopping-cart.service';
import { Products_Model } from './../models/product-model';
import { Component, OnInit, Input } from '@angular/core';
import { CartModel } from '../models/Cart_Model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input ('p') p :Products_Model;
  @Input('show-action')showAction=true;
  @Input('shopping-cart') shoppingCart:CartModel;
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.p);
  }

 
  // getQuantity(){
  //   if(!this.shoppingCart) return 0;
  //   let item = this.shoppingCart.items[this.p.key];
  //   return item ? item.quantity:0;
  // }

}
