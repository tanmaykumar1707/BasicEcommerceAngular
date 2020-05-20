import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Injectable, Query } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {  
  constructor(private db:AngularFireDatabase) {
   
   }


  getMyOrders(userId:string){
    
     console.log(userId);
    return this.db.list('/orders',
    ref=> ref.orderByChild('userId').equalTo(userId)
    ).valueChanges();
  }
  

}
