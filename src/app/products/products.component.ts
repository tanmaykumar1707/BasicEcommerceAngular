import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Products_Model } from 'src/app/models/product-model';
import { Observable, Subscription } from 'rxjs';
import { CategoryServiceService } from './../services/category-service.service';
import { ProductServiceService } from './../services/product-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

import { AngularFireList, SnapshotAction } from '@angular/fire/database/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy  {

  products:Products_Model[]=[];
  filtered: Products_Model[];
 
  category:string;
  pro:Products_Model[]=[];
  cart:any;
  subs:Subscription;

  constructor(  
    route:ActivatedRoute,
    productService:ProductServiceService,
   private cartService: ShoppingCartService
    
      ) { 

      
       
        // productService.getAll().pipe(switchMap(data => {  
         
        //           data.forEach(item => {
        //             let a = item.payload.toJSON(); 
        //             a['$key'] = item.key;
        //             this.products.push(a as Products_Model);
        //   });
        //     return  route.queryParamMap;
        
        // })).subscribe(params => {
        //   this.category = params.get('category');
  
        //   this.filtered  = (this.category) ?
        //   this.filtered.filter(p=> p.category===this.category) :
        //   this.products;
        // });

    
       
          // productService.getAll().subscribe(list=>{
          //   this.products = list.map(item=>{
          //       return {
          //             $key:item.key,
          //         ...item.payload.val() as JSON
          //       };        
          //   });
          // });

          productService.getAll().pipe(switchMap(list=>{
            this.products = list.map(item=>{
                return {
                      key:item.key,
                  ...item.payload.val() as JSON
                };        
            });
            return  route.queryParamMap;
          })).subscribe( (params:Params) => {
            this.category = params.get('category');
            this.filtered = this.products;
            this.filtered  = (this.category) ?
            this.filtered.filter(p=> p.category===this.category) :
            this.products;
          });
  }

 async ngOnInit(){
  this.subs = (await this.cartService.getCart()) 
  .subscribe(cart=> this.cart = cart);
 }

 ngOnDestroy(){ 
      // this.subs.unsubscribe();
 }



}
