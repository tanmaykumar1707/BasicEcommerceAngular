import { Observable, Subscription } from 'rxjs';
import { ProductServiceService } from './../../services/product-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products_Model } from 'src/app/models/product-model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  product:Observable<any[]>

  constructor(  private productservice:ProductServiceService ) {
      this.product = this.productservice.getAll();

   }

  //  product: Products_Model[];
  //  fiterProd:any[];
  //   sub : Subscription;
  //  constructor(  private productservice:ProductServiceService ) {
  //     this.sub = this.productservice.getAll().subscribe(prod =>this.product=prod);
 
  //   }

    filter(query:string){
    //  this.fiterProd=(query)?
    //  this.product.filter(p=>p.payload.title.toLowerCase().includes(query.toLowerCase())):
    //  this.product;

   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    // this.sub.unsubscribe();
  }

} 
 