import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { cartItem_Model } from './../models/cartItem-Model';
import { CartModel } from './../models/Cart_Model';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})


export class BsNavbarComponent implements OnInit  {
  appuser: AppUser;
  cartItemNumber:number;
  c:CartModel[];
  public isMenuCollapsed = true;
  cart1$: Observable<CartModel>;
  constructor( private auth: AuthService, private cartService:ShoppingCartService) { 
     auth.appUser$.subscribe(appuser=>this.appuser =appuser );
   
  }

  logout(){
    this.auth.logout()
  }

  async ngOnInit(){
    
      // let cart$ = await this.cartService.getCart();
      // cart$.valueChanges().subscribe((cart:CartModel)=>{
      //   this.cartItemNumber =0;
      //       for(let productId in cart.items)
      //       this.cartItemNumber+=cart.items[productId].quantity;
     
      // });
       
      // this.cart1$ = (await this.cartService.getCart()).valueChanges().pipe(map((c:CartModel)=>{
      //     return  new CartModel(c.items); 
      // }))
      this.cart1$= await this.cartService.getCart() ;
    
  }
  
}
