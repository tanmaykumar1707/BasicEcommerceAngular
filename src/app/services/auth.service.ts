import { UserService } from './user.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user$: Observable<firebase.User>;

  constructor(private userservice: UserService ,
            private afAuth: AngularFireAuth,
              private route:ActivatedRoute) { 
    
    this.user$=afAuth.authState;
  }


  login(){  
     let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl')||'/';
     localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout(){
    this.afAuth.signOut()
  }

  get appUser$():Observable<AppUser>{
       return  this.user$
            .pipe(switchMap(user=> 
              {
                if(user) 
                  return  this.userservice.get(user.uid).valueChanges(); 
         
                  // return Observable.of(null);
            
            })); 
  }

  get appUserWithUid$(){
    return this.user$;
  }



}
