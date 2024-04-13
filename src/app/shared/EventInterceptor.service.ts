import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EventIneterceptorService implements HttpInterceptor {
  isOnlineSubject: BehaviorSubject<boolean>;
  queue: HttpRequest<any>[] = [];

  counter: number = 1;

  constructor(private http: HttpClient) {
    this.isOnlineSubject = new BehaviorSubject<boolean>(navigator.onLine);

    window.addEventListener('online', () => this.isOnlineSubject.next(true));
    window.addEventListener('offline', () => this.isOnlineSubject.next(false));
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      // Store request in local storage
      this.queue.push(req.clone());
      this.storeRequest(req);
      return new Observable<HttpEvent<any>>(); // Empty observable
    }

    return next.handle(req);
  }

  private storeRequest(request: HttpRequest<any>): void {
    const storedRequests = JSON.parse(
      localStorage.getItem('storedRequests') || '[]'
    );
    storedRequests.push(request);
    localStorage.setItem('storedRequests', JSON.stringify(storedRequests));
  }

  syncPendingRequests(): Observable<any> {
    let storedRequests: any[] = [];
    if (this.isOnlineSubject.value) {
      storedRequests = JSON.parse(
        localStorage.getItem('storedRequests') || '[]'
      );

      const requests = storedRequests.map((request: any) => {
        return this.http.request(request.method, request.url, {
          body: request.body,
        });
      });

      localStorage.removeItem('storedRequests');

      return new Observable((observer) => {
        let count = 0;
        requests.forEach((req: Observable<any>) => {
          req.subscribe({
            next: () => {
              count++;
              if (count === requests.length) {
                observer.next('Sync successful');
                observer.complete();
              }
            },
            error: (error) => {
              observer.error(`Error syncing request: ${error}`);
            },
          });
        });
      });
    }
  }
}
