import { async } from '@angular/core/testing';
import { Order } from './../models/order';
import { AuthService } from './../services/auth.service';
import { OrdersService } from './../services/orders.service';
import { Products_Model } from './../models/product-model';
import { cartItem_Model } from './../models/cartItem-Model';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { CartModel } from './../models/Cart_Model';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  shipping={};
  cart$:Observable<CartModel>
  cart: CartModel;
  Cartsubcription:Subscription;
  Usersubscription:Subscription;
  userId:string;
  constructor(
    private router:Router,
    private authService:AuthService,
    private cartService: ShoppingCartService, 
    private orderService:OrdersService) {
      
     
    }


 async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
   this.Cartsubcription=this.cart$.subscribe((cart:CartModel)=>this.cart = cart );
    this.Usersubscription =  this.authService.appUserWithUid$.subscribe(user=> 
      {
        this.userId= user.uid;
       
      });
    
    

  }


  async placeOrder(ship){

      let order = new Order(this.userId,ship, this.cart );
        // let order = {
        //   userId:this.userId,
        //   datePlaced: new Date().getTime(),
        //   shipping : ship,
        //   items:

        // };
       let result = await this.orderService.storeOrder(order);
     
       this.router.navigate(['/order-success',result.key]);

  }
  ngOnDestroy(){
   this.Cartsubcription.unsubscribe();
    this.Usersubscription.unsubscribe();
  }

}
