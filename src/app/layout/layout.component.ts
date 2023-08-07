import { switchMap, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  paragraph: string = 'this is text from class component';
  title = 'formation';
  firstName: string = 'Amine';
  lastName: string = 'Mouha';
  logo: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png';

  isLoggedIn: boolean = false;
  // products: any[] = [
  //   null,
  //   {
  //     title: 'Product 2',
  //     description: 'this is a product',
  //     price: 300,
  //     isNew: true,
  //   },
  //   {
  //     title: 'Product 3',
  //     description: 'this is a product',
  //     price: 160,
  //     isNew: false,
  //   },
  //   {
  //     title: 'Product 4',
  //     description: 'this is a product',
  //     price: 888,
  //     isNew: false,
  //   },
  //   {
  //     title: 'Product 1',
  //     description: 'this is a product',
  //     price: 250,
  //     isNew: false,
  //   },
  //   {
  //     title: 'Product 2',
  //     description: 'this is a product',
  //     price: 300,
  //     isNew: false,
  //   },
  //   {
  //     title: 'Product 3',
  //     description: 'this is a product',
  //     price: 160,
  //     isNew: true,
  //   },
  //   {
  //     title: 'Product 4',
  //     description: 'this is a product',
  //     price: 888,
  //     isNew: true,
  //   },
  // ];
  posts!: Observable<Post[]>;
  showError: boolean = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  updateClickedPost(postId: number) {
    const dummyData = {
      title: 'example title',
      body: 'example body',
    } as Post;

    // this.postsService.updatePost(postId, dummyData).subscribe();
    this.postsService
      .deletePost(postId)
      .pipe(
        switchMap((result) => {
          return this.postsService.getPosts();
        })
      )
      .subscribe();
  }

  toggleBlock() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  handleClickProduct(event: any) {
    console.log('Some product is clicked ', event);
  }
}
