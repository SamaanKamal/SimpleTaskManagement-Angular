import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../shared/Event.model';
import { EventService } from '../shared/Event-Service.service';

@Component({
  selector: 'app-update-response',
  templateUrl: './update-response.component.html',
  styleUrls: ['./update-response.component.css'],
})
export class UpdateResponseComponent implements OnInit {
  UpdatedEvent: Event;
  id: number;
  isLoading = false;
  error: string = null;
  isDeleteSuccess: boolean = false;
  message: string = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    if (!this.isDeleteSuccess) {
      this.fetchEvent();
    }
  }

  fetchEvent() {
    this.isLoading = true;
    this.eventService.fetchEvent(this.id).subscribe({
      next: (resonseData) => {
        this.isLoading = false;
        console.log(resonseData);
        this.UpdatedEvent = resonseData;
      },
      error: (errorMessage) => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
      },
    });
  }
  onNavigation() {
    this.router.navigate(['./events']);
  }
  deleteEvent() {
    this.isLoading = true;
    console.log(this.id)
    
    this.eventService.deleteEvent(this.id).subscribe({
      next: (resonseData) => {
        this.isLoading = false;
        console.log(resonseData);
        this.isDeleteSuccess = true;
        this.message = resonseData;
        this.UpdatedEvent = null;
        console.log(this.isDeleteSuccess);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
      },
    });
  }
}
