import { CanActivate } from '@angular/router';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  implements CanActivate {

  constructor(private auth:AuthService, private userserivce: UserService) { }

  canActivate(): Observable<boolean>{
   return  this.auth.appUser$
        .pipe(map(appUser=>appUser.isAdmin));
    
   }
}
