import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  posts!: Observable<Post[]>;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }

  visitDetails(postId: number) {
    this.router.navigateByUrl(`/posts/details/${postId}`);
  }
}
