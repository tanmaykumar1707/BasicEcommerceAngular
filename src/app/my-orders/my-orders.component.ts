import { switchMap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { OrderListService } from './../services/order-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {
  
    list$:Observable<any[]>;
    Usersubscription:Subscription;
    userId:string;
  constructor(private orderlist:OrderListService,
            private authService:AuthService ) {
   }

  ngOnInit() {
    // this.Usersubscription =  this.authService.appUserWithUid$.subscribe(user=> 
    //   {
    //     this.userId= user.uid;
    //     this.list$ =this.orderlist.getMyOrders(user.uid);
  
    //   });

      this.list$ = this.authService.appUserWithUid$.pipe(switchMap(user=>{
        return this.orderlist.getMyOrders(user.uid);
      }))
     
  }

  ngOnDestroy(){
    // this.Usersubscription.unsubscribe();

  }
}
