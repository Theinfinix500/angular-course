import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './products/product.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
  },

  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.module').then((m) => m.ExampleFormsModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      message: 'Something Went Wrong',
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      message: 'Page Not Found',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
