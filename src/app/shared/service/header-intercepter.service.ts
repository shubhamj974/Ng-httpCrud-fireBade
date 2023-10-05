import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class HeaderIntercepterService implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loaderService.loaderStatus.next(true);
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authroization: 'JWT Token',
      },
    });
    return next.handle(authReq).pipe(
      delay(1500),
      finalize(() => {
        this._loaderService.loaderStatus.next(false);
      })
    );
  }
}
