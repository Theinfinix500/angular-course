import { PostsService } from './services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public postsService:PostsService) {}

  ngOnInit(): void {
    // set something global
    // set auth config -> Connected user
    console.log('AppComponent Init');
  }
}
