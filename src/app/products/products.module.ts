import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductComponent } from './product.component';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [ProductCardComponent, ProductComponent, PostDetailsComponent],
  imports: [CommonModule, ProductsRoutingModule],
  exports: [ProductCardComponent, ProductComponent],
})
export class ProductsModule {}
