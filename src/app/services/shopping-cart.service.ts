import { Products_Model } from 'src/app/models/product-model';
import { SnapshotAction, AngularFireList } from '@angular/fire/database/database';
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take,map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartModel } from '../models/Cart_Model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  create(){
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()

    });
  }

   async getCart(): Promise<Observable<CartModel>>  { 
        let cartId = await this.getOrCreateCart();
      return this.db.object('/shopping-carts/'+cartId).valueChanges().pipe(map((c:CartModel)=>{
        return  new CartModel(c.items); 
    }));
  }

  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
  }

  private async getOrCreateCart():Promise<string>{
    let cartId = localStorage.getItem('cartId');
  
    if(cartId)   return cartId;

        let result = await this.create();
        localStorage.setItem('cartId',result.key);
        return result.key;
  }


  async addToCart(product:Products_Model){
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId,product.key);
   
    // item$.valueChanges().pipe(take(1)).subscribe((p:any) => {
    //   if (p) item$.update({ quantity: p.quantity + 1 });
    //   else item$.set({ product: product, quantity: 1 }); 
    // });
    item$.valueChanges().pipe(take(1)).subscribe((p:any) => {
         item$.update({ product: product, quantity: (p?.quantity || 0)+1 }); 
    });
  }


  
  async removeFromCart(product:Products_Model){
      this.updateItemQunatity(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCart();
    this.db.object('/shopping-carts/'+cartId+'/items/').remove();
  }

  private async updateItemQunatity(product:Products_Model,change:number){
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId,product.key);
    item$.valueChanges().pipe(take(1)).subscribe((p:any) => {
        let q = (p?.quantity || 0)+change;
        if(q===0)
        item$.remove();
        else
         item$.update({ product: product, quantity:q }); 
    });
  }

}
