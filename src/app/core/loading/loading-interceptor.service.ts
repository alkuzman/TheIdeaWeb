import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoadingService} from './loading.service';

export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private readonly loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.load();
    return next.handle(req).pipe(finalize(() => {
      this.loadingService.loadingDone();
    }));
  }
}
