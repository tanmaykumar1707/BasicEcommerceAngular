import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private userservice: UserService ,private auth:AuthService,router:Router){
    auth.user$.subscribe(user => {
      if(user){
        userservice.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
       
    })

 
  }

}
