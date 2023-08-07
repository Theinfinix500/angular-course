import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('inputPost') post!: Post;
  @Input('view') viewMode: boolean = false;
  @Output() clicked = new EventEmitter();
  badge: any;

  ngOnInit(): void {
    // this.badge = this.post. + 100;
  }

  onClick() {
    // communicate with parent
    this.clicked.emit('Child Data');
  }
}
