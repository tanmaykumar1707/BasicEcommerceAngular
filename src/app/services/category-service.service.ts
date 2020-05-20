import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private db:AngularFireDatabase) { }

getCategories(){
  return this.db.list('/categories').snapshotChanges();
}

}
