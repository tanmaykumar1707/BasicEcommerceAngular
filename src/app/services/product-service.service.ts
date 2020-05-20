import { Injectable } from '@angular/core';
import { AngularFireDatabase, DatabaseSnapshot } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Products_Model } from '../models/product-model';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private db:AngularFireDatabase) { }


  create(product){
        this.db.list('products').push(product);
  
  }

  getAll(){
    return this.db.list('products').snapshotChanges();
  }

  // getAllN(){   
  //   let d =[]; 
  //     this.db.list('products').snapshotChanges() .subscribe(data => {  
  //       data.forEach(item => {
  //         let a = item.payload.toJSON(); 
  //         a['$key'] = item.key;
  //         d.push(a as Products_Model);
              
  //       });
  //     });
  //     return d;

  // }
  // getAllNew(){   
     
  //   return  this.db.list('products').snapshotChanges() .pipe(map(data => {  
  //       data.map(item => {
  //         let a = item.payload.val(); 
  //         a['$key'] = item.key;
              
  //       });
  //     }));
  // }
//   getNavigation(db: AngularFireDatabase): any {
//     return db.list('/products', ref => {
//         let query = ref.limitToLast(100).orderByChild('sortOrder');
//         return query;
//     }).snapshotChanges().pipe(
//         map(pages => {
//             return pages.map(p => ({ key: p.key, ...p.payload.toJSON }));
//         })
//     );
// }


  get(productId){
    return this.db.object('products/'+productId).snapshotChanges();
  }

  update(id, product){
    return this.db.object('products/'+id).update(product);
  }

  delete(id){
    return this.db.object('products/'+id).remove();
  }

}
