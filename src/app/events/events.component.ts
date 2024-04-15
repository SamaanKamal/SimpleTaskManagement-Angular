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
  isLoading = false;
  isDeleteSuccess: boolean = false;
  message: string = null;

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
  
  onDeleteEvent(eventId:number) {
    this.isLoading = true;
    
    this.eventService.deleteEvent(eventId).subscribe({
      next: (resonseData) => {
        this.isLoading = false;
        console.log(resonseData);
        this.isDeleteSuccess = true;
        this.message = resonseData;
        this.eventService.setResponseMessage(this.message);
        console.log(this.isDeleteSuccess);
        this.router.navigate(['./deleted-Event',eventId]);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
      },
    });
  }
}

