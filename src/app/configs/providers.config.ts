import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { InjectionToken, LOCALE_ID } from '@angular/core';

export const BACKEND_URL: InjectionToken<string> = new InjectionToken(
  'BACKEND_URL'
);

export const APP_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: NotFoundInterceptor,
  //   multi: true,
  // },
  {
    provide: LOCALE_ID,
    useValue: 'fr',
  },
  {
    provide: BACKEND_URL,
    useValue: 'https://jsonplaceholder.typicode.com',
  },
];
