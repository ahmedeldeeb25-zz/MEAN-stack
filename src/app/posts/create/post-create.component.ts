import { PostService } from "./../post.service";
import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from "../post.model";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  //@Output() postCreated = new EventEmitter<Post>();
  private postId: String;
  private mode = "create";
  post: Post;
  isLoading = false;

  constructor(private postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {

    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.post = this.postService.getPost(this.postId);
        this.isLoading = false;
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });

    console.log(this.post);
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const post = {
      title: form.value.title,
      content: form.value.content
    };

    this.postService.savePost(post).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error:: " + err);
      }
    );

    // this.postCreated.emit(post);
    form.resetForm();
  }
}
