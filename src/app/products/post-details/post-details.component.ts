import { PostsService } from './../../services/posts.service';
import { switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post;

  constructor(
    private activeRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    // this.activeRoute.params
    //   .pipe(
    //     switchMap((params) => {
    //       return this.postsService.getPostById(params['postId']);
    //     })
    //   )
    //   .subscribe((post) => {
    //     this.post = post;
    //   });

    this.activeRoute.data.subscribe(({ postData: post }) => {
      this.post = post;
    });
  }
}
