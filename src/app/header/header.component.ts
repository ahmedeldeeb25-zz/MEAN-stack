import { AuthService } from './../auth/auth.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector:"app-header",
    templateUrl:"header.component.html",
    styleUrls:["header.component.css"]
})
export class HeaderComponent implements OnInit,OnDestroy{

    private authListenerSub:Subscription;
    userIsAuthenticated:boolean;

    constructor(private authService:AuthService){}

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSub = this.authService
          .getAuthStatusListener()
          .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
          });
      }
    
    ngOnDestroy(): void {
        this.authListenerSub.unsubscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}