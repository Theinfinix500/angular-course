import {
  Observable,
  take,
  throwError,
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  Subscription,
} from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  posts!: Post[];
  subscription: Subscription;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    // this.postsService.shareData('Hello From Product Component');
    // this.posts =
    const observer = {
      next: (result) => {
        this.posts = result;
      },
      error: (err) => {
        console.log('Error');
      },
      complete: () => {
        console.log('Complete');
      },
    };
    // this.postsService.getPosts().subscribe(observer);

    // this.postsService.combinedObservables.subscribe(([posts, users]) => {
    //   console.log('Posts ', posts);
    //   console.log('Users ', users);
    // });
    // this.postsService.concatMapExample().subscribe((result) => {
    //   console.log('ConcatMapExample result ', result);
    // });
    this.postsService.concatMapWithoutForkJoin().subscribe((result) => {
      console.log('concatMapWithoutForkJoin result ', result);
    });

    this.subscription = this.postsService
      .searchTermSubjectObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged((previous, current) => {
          console.log('Previous value: ', previous);
          console.log('Current value: ', current);

          return true;
        }),
        startWith('sunt'),
        filter((term) => term.trim().length > 3),
        switchMap((term) => {
          return this.postsService.getPosts(term);
        })
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('completed');
  }

  visitDetails(postId: number) {
    this.router.navigateByUrl(`/posts/details/${postId}`);
  }

  search(value: string) {
    this.postsService.shareData(value);
    // this.postsService.searchTerm(value);
  }
}
