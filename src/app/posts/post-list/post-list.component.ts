import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";

import { Post } from "../post.model";
import { PostService } from "../post.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  postsPerPage = 2;
  total = 10;
  pageSizeOptions = [1, 2, 5, 10];
  page = 1;
  isAuthenticated=false;

  constructor(public postsService: PostService,private authService:AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.page, this.postsPerPage);

    this.authService.getAuthStatusListener().subscribe(res=>{
      this.isAuthenticated = res;
    });
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postsData: {posts:Post[],total:number}) => {
        this.isLoading = false;
        this.total=postsData.total;
        this.posts = postsData.posts;
      });
  }

  onChangePage(pageEvent: PageEvent) {
    this.isLoading=true;
    this.page = pageEvent.pageIndex+1;
    this.postsPerPage = pageEvent.pageSize;


    this.postsService.getPosts(this.page, this.postsPerPage);
    console.log(pageEvent);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(res=>{
      this.postsService.getPosts(this.page, this.postsPerPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
