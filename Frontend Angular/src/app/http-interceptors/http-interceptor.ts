import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { InactivityService } from '../services/inactivity.service';
import { Observable } from 'rxjs';

@Injectable()
export class InactivityInterceptor implements HttpInterceptor {

  constructor(private inactivityService: InactivityService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.inactivityService.resetTimer();
          }
        }
      )
    );

  }
}