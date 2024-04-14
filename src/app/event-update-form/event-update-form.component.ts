import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '../shared/Event.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../shared/Event-Service.service';

@Component({
  selector: 'app-event-update-form',
  templateUrl: './event-update-form.component.html',
  styleUrls: ['./event-update-form.component.css']
})
export class EventUpdateFormComponent implements OnInit {
  organizerSelected: string = 'yes'; 
  creatorSelected: string = 'yes';
  attendeeSelected: string = 'yes';
  resourceSelected: string = 'yes';
  optionalSelected: string = 'yes';
  isLoading = false;
  error: string = null;
  data: Event;
  id: number;
  event:Event

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.route.data.subscribe(data => {
      this.event = history.state.event; // Assuming you're resolving the event data in the route
    });
    console.log(this.id);
    console.log(this.optionalSelected);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const startTime = new Date(form.value.startTime);
    const endTime = new Date(form.value.endTime);
    const isoString1 = startTime.toISOString(); 
    const isoString2 = endTime.toISOString();
    const timezoneOffset = '+02:00'; 

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
        email: form.value.organizerEmail,
        displayName: form.value.organizerDisplayName,
        self:form.value.organizerSelected  === 'yes' ? true:false
      },
      creator: {
        creatorId: form.value.creatorId,
        email: form.value.creatorEmail,
        displayName: form.value.creatorDisplayName,
        self:form.value.creatorSelected  === 'yes' ? true:false
      },
      attendees: [
        {
          attendeeId:form.value.attendeeId,
          email: form.value.email,
          displayName: form.value.displayName,
          responseStatus: form.value.responseStatus,
          comment: form.value.comment,
          additionalGuests: form.value.additionalGuests,
          resource: form.value.resourceSelected === 'yes' ? true:false,
          optional: form.value.optinalSelected === 'yes' ? true:false,
          self: form.value.attendeeSelected === 'yes' ? true:false,
        },
      ],
      attachments: [
        {
          id:form.value.fileId,
          fileUrl: form.value.fileUrl,
          title: form.value.title,
          mimetype: form.value.mimetype,
          iconLink: form.value.iconLink,
          fileId:form.value.fileIdPath
        },
      ],
    };
    this.eventService.updateEvent(this.id,this.data).subscribe({
      next: (resonseData) => {
        this.data = resonseData;
        console.log(resonseData);
        this.isLoading = false;
        this.router.navigate(['./updated-event',resonseData.eventId]);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
      },
    });
   }
}
