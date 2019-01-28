import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PostCreateComponent } from "./create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
 
 

@NgModule({
  declarations: [
      PostCreateComponent,
       PostListComponent
    ],
  imports: [
      AngularMaterialModule,
      CommonModule, // For *ngIf directive for ex
      ReactiveFormsModule,
      RouterModule   
  ],
  providers: [],
  bootstrap: []
})
export class PostModule {}
