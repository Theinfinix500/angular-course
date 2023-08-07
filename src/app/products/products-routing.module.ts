import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { postResolver } from '../resolvers/post.resolver';
import { canNavigateGuard } from '../guards/can-navigate.guard';

const routes: Routes = [
  {
    path: 'posts',
    canActivate: [canNavigateGuard],
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'details/:postId',
        component: PostDetailsComponent,
        resolve: {
          postData: postResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
