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

  constructor(private eventService: EventService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const startTime = new Date(form.value.startTime);
    const endTime = new Date(form.value.endTime);
    const isoString1 = startTime.toISOString(); // Convert to ISO 8601 string
    const isoString2 = endTime.toISOString();
    const timezoneOffset = '+02:00'; // Your desired timezone offset

    const formattedDate1 = isoString1.slice(0, 19) + timezoneOffset;
    const formattedDate2 = isoString2.slice(0, 19) + timezoneOffset;
    console.log(startTime);
    this.data = {
      summary: form.value.summary,
      description: form.value.description,
      startDatetime: formattedDate1,
      endDatetime: formattedDate2,
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
      attachments: [
        {
          fileUrl: form.value.fileUrl,
          title: form.value.title,
          mimeType: form.value.mimeType,
          iconLink: form.value.iconLink,
          fileId:form.value.fileId
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
