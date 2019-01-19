import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{

    isLoading=false;


    constructor(private authService:AuthService ){}


    onLogin(form:NgForm){
        if(form.invalid){
            console.log("Invalid data");
            return;
        }

       this.authService.login(form.value.email,form.value.password);

    }

}