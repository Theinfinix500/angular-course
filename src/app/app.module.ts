import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import { ProductsModule } from './products/products.module';
import { LayoutComponent } from './layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';

registerLocaleData(localeFR);

@NgModule({
  declarations: [AppComponent, LayoutComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotFoundInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr',
    },
    PostsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
