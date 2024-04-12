import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../shared/Event-Service.service';
import { Event } from '../shared/Event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  isLoading = false;
  error: string = null;
  data: Event;

  constructor(private eventService: EventService,private router:Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.data = {
      summary: form.value.summary,
      description: form.value.description,
      startDatetime: form.value.startTime,
      endDatetime: form.value.endTime,
      location: form.value.location,
      status: form.value.status,
      visibility: form.value.visibility,
      organizer: {
        organizerId: form.value.organizerId,
      },
      creator: {
        creatorId: form.value.creatorId,
      },
      attendees: [
        {
          email: form.value.email,
          displayName: form.value.displayName,
          responseStatus: form.value.responseStatus,
          comment: form.value.comment,
          additionalGuests: form.value.additionalGuests,
          resource: true,
          optional: false,
          self: true,
        },
      ],
      attachment: [
        {
          fileUrl: form.value.fileUrl,
          title: form.value.title,
          mimeType: form.value.mimeType,
          iconLink: form.value.iconLink,
        },
      ],
    };
    this.eventService.createEvent(this.data).subscribe({
      next: (resonseData) => {
        console.log(resonseData);
        this.router.navigate(['./events']);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
  }
}
