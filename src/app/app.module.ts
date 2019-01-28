import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthService } from "./auth/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PostService } from "./posts/post.service";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

import {AngularMaterialModule} from "./angular-material.module";
import { PostModule } from './posts/post.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    PostModule
  ],
  providers: [PostService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true //for multi interceptors
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
