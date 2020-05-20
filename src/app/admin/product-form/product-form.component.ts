import { Products_Model } from './../../models/product-model';
import { ProductServiceService } from './../../services/product-service.service';
import { Observable } from 'rxjs';
import { CategoryServiceService } from './../../services/category-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

// import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  cat:Observable<any[]>;
  product:Products_Model={};
  id;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    categoryservice: CategoryServiceService, 
     private productService:ProductServiceService
    ) {
     this.cat= categoryservice.getCategories();
        this.id=this.route.snapshot.paramMap.get('id');
        if(this.id)
          this.productService.get(this.id).pipe(take(1)).subscribe(
            
            p=>  {
              let pr = p.payload.val();
              pr['$key'] = p.key;
              this.product=pr as Products_Model ; 
            }
            
            );
   }

 
   save(product){    
     if(this.id)
        this.productService.update(this.id,product);
      else
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
   }

   delete(){
     if(confirm('Delete?')){
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
     }

   }

  ngOnInit(): void {
  }

}
