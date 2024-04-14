import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/Event-Service.service';
import { Event } from '../shared/Event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  error: string = null;
  constructor(private eventService: EventService,private router:Router) { }
  
  ngOnInit(): void {
    this.fetchEvents();
  }
  fetchEvents(): void {
    this.eventService.fetchEvents().subscribe(
      {
        next: (resonseData) => {
          console.log(resonseData.events);
          this.events = resonseData.events;
          console.log(navigator.onLine);
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
        },
      }
    );
  }
  onEditEvent(eventId: string,event:Event) {
    this.router.navigate(['/update-event',eventId],{ state: { event } });
  }
}

