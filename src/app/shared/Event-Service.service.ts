import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Event } from './Event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl: string = '/api/Events';
  private url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  fetchEvents():Observable<any> {
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
        return of([]);
      })
    );
  }
  createEvent(eventData: Event) {
    return this.http
      .post<string>(`${this.url}${this.apiUrl}/createEvent`, eventData)
      .pipe(
        catchError((error) => {
          console.error('Error creating event:', error);
          return of(null);
        })
      );
  }
  updateEvent(eventId: number, eventData: Event) {
    return this.http
      .put<Event>(
        `${this.url}/${this.apiUrl}/updateEvent/${eventId}`,
        eventData
      )
      .pipe(
        catchError((error) => {
          console.error(
            'Error updating event:',
            error + ' with id : ' + eventId
          );
          return of(null);
        })
      );
  }
  deleteEvent(eventId: number) {
    return this.http
      .delete<string>(`${this.url}/${this.apiUrl}/deleteEvent/${eventId}`)
      .pipe(
        catchError((error) => {
          console.error(
            'Error deleting event:',
            error + ' with id : ' + eventId
          );
          return of(false);
        })
      );
  }
}
