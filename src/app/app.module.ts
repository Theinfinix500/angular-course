import { NgModule, LOCALE_ID, InjectionToken } from '@angular/core';
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
import { of } from 'rxjs';
import { APP_PROVIDERS } from './configs/providers.config';

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
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
