import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, throwError } from 'rxjs';
import { Event } from './Event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl: string = '/api/Events';
  private url: string = 'http://localhost:8080';
  private responseMessage = new Subject<string>();
  
  constructor(private http: HttpClient) { }

  setResponseMessage(response: string) {
    this.responseMessage.next(response);
  }

  getResponseMessgage(): Observable<string> {
    return this.responseMessage.asObservable();
  }

  fetchEvents(): Observable<any> {
    return this.http.get<any>(this.url + this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching events:', error);
        return of([]);
      })
    );
  }
  fetchEvent(eventId: number) {
    return this.http.get<Event>(this.url + this.apiUrl + '/' + eventId).pipe(
      map((events) => {
        return events;
      }),
      catchError((error) => {
        console.error(
          'Error fetching event: ',
          error + ' with id : ' + eventId
        );
        return throwError(() => {
          const newError = new Error(
            'Error fetching event:'+
            error + ' with id : ' + eventId
          );
          return newError;
        });
      })
    );
  }
  createEvent(eventData: Event) {
    return this.http
      .post<string>(`${this.url}${this.apiUrl}/createEvent`, eventData)
      .pipe(
        catchError((error) => {
          console.error('Error creating event:', error);
          return throwError(() => {
            const newError = new Error('Error creating event:' + error);
            return newError;
          });
        })
      );
  }
  updateEvent(eventId: number, eventData: Event) {
    return this.http
      .put<Event>(`${this.url}${this.apiUrl}/updateEvent/${eventId}`, eventData)
      .pipe(
        catchError((error) => {
          console.error(
            'Error updating event:',
            error + ' with id : ' + eventId
          );
          return throwError(() => {
            const newError = new Error(
              'Error updating event:' + error + ' with id : ' + eventId
            );
            return newError;
          });
        })
      );
  }
  deleteEvent(eventId: number) {
    return this.http
      .delete<string>(`${this.url}${this.apiUrl}/deleteEvent/${eventId}`)
      .pipe(
        catchError((error) => {
          console.error(
            'Error deleting event:',
            error + ' with id : ' + eventId
          );
          return throwError(() => {
            const newError = new Error(
              'Error deleting event:' + error + ' with id : ' + eventId
            );
            return newError;
          });
        })
      );
  }
}
