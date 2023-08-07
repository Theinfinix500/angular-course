import { Observable } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

export const postResolver: ResolveFn<Observable<Post>> = (route, state) => {
  const postService = inject(PostsService);
  const postId = +route.paramMap.get('postId');

  return postService.getPostById(postId);
};
