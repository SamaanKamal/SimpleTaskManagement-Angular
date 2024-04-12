import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/Event-Service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  error: string = null;
  constructor(private eventService: EventService) { }
  
  ngOnInit(): void {
    this.fetchEvents();
  }
  fetchEvents(): void {
    this.eventService.fetchEvents().subscribe(
      {
        next: (resonseData) => {
          console.log(resonseData);
          this.events = resonseData;
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
        },
      }
    );
  }
}
