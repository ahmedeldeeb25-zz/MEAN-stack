import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { post } from "selenium-webdriver/http";
import { Subject } from "rxjs/Subject";
import { Post } from "./post.model";

@Injectable()
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get("http://localhost:3000/api/posts");
  }

  savePost(post): Observable<any> {
    return this.http.post("http://localhost:3000/api/posts", post);
  }

  getPost(postId:any){
    console.log(this.posts);
    console.log("xxx");
     return {...this.posts.find(p => p._id === postId)};
  }

  setPostsValues(posts:Post[]){

    this.posts=posts;
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post._id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
