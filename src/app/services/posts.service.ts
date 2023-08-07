import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import {
  Observable,
  map,
  switchMap,
  forkJoin,
  catchError,
  throwError,
  tap,
  delay,
} from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class PostsService {
  private API_URL = 'https://jsonplaceholder.typicode.com';
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.getUsers().subscribe();
  }

  getPosts() {
    return this.http.get<Post[]>(`${this.API_URL}/postsss`).pipe(
      map((posts) => {
        return posts.map((post) => {
          const user = this.users.find((user) => user.id === post.userId);
          return {
            ...post,
            user,
          };
        });
      })
    );
  }

  getPostById(postById: number): Observable<Post> {
    return this.http
      .get<Post>(`${this.API_URL}/posts/${postById}`)
      .pipe(delay(5000));
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${userId}`);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.API_URL}/users`).pipe(
      tap((users) => {
        this.users = users;
      })
    );
  }

  updatePost(postId: number, post: Post) {
    return this.http.put(`${this.API_URL}/posts/${postId}`, post);
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.API_URL}/posts/${postId}`);
  }
}
