import { ShoppingCartService } from './shopping-cart.service';
import { async } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db:AngularFireDatabase,private cartService:ShoppingCartService) { }

 async storeOrder(order){
   let result =  await this.db.list('orders').push(order);
    this.cartService.clearCart();
    return result;
  }


}
