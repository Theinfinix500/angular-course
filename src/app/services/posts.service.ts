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
  Subject,
  of,
  retry,
  finalize,
  combineLatest,
  concatMap,
  filter,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
} from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class PostsService {
  private API_URL = 'https://jsonplaceholder.typicode.com';
  private users: User[] = [];
  private searchTermSubject: Subject<string> = new Subject();
  private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject('User');

  combinedObservables = combineLatest([this.getPosts(), this.getUsers()]);

  constructor(private http: HttpClient) {
    // this.getUsers().subscribe();
  }

  searchTerm(value: string) {
    this.searchTermSubject.next(value);
  }

  shareData(data) {
    this.sharedDataSubject.next(data);
  }

  sharedData$ = this.sharedDataSubject.asObservable();

  searchTermSubjectObservable() {
    return this.searchTermSubject.asObservable();
  }

  completeSubject() {
    this.searchTermSubject.complete();
  }

  concatMapWithoutForkJoin() {
    return of(1, 2, 3, 4, 5).pipe(
      concatMap((id) => {
        return this.getUserById(id).pipe(filter((result) => result !== null));
      })
    );
  }

  concatMapExample() {
    return this.getUsers().pipe(
      concatMap((users) => {
        return forkJoin(
          users.map((user) => {
            return this.getUserById(user.id);
          })
        );
      })
    );
  }

  getPosts(query?: string) {
    const reqUrl = query
      ? `${this.API_URL}/posts?q=${query}`
      : `${this.API_URL}/posts`;
    return this.http.get<Post[]>(reqUrl).pipe(
      retry(4),
      switchMap((posts) =>
        forkJoin([
          ...posts.map((post) => {
            // const user = this.users.find((user) => user.id === post.userId);
            return this.getUserById(post.userId).pipe(
              map((user) => {
                return {
                  ...post,
                  user,
                };
              })
            );
          }),
        ])
      ),
      finalize(() => {
        console.log('Finalized');
      }),
      catchError((error) => {
        return of([
          {
            userId: 1,
            id: 1,
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          },
        ]);
      })
    );
  }

  getPostById(postById: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${postById}`).pipe();
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${userId}`).pipe(
      catchError((error) => {
        return of(null as User);
      })
    );
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
