import { Injectable, InjectionToken, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthToken } from "src/app/auth/auth-store/tokens";
import { first } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;
  private subscription;

  private freeAccess = [
    { method: "POST", path: /\/user$/ },
    { method: "POST", path: /\/user\/login$/ },
    { method: "POST", path: /\/user\/forgot$/ },
    { method: "GET", path: /\.json$/ }
  ];

  constructor(@Inject(AuthToken) private authToken$: Observable<string>) {
    this.subscription = this.authToken$.subscribe(token => {
      this.token = token;

      if(token && this.subscription) {
        this.subscription.unsubscribe();
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;

    if (this.routeWithoutToken(req.method, req.url)) {
      return next.handle(req);
    }

    authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + this.token } });

    return next.handle(authReq);
  }

  private routeWithoutToken(method: string, url: string): boolean {
    let result = false;

    this.freeAccess.forEach(c => {
      if (c.method === method && c.path.test(url)) {
        result = true;
      }
    });

    return result;
  }
}
