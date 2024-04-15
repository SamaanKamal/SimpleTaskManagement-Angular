import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../shared/Event-Service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creation-response',
  templateUrl: './creation-response.component.html',
  styleUrls: ['./creation-response.component.css'],
})
export class CreationResponseComponent implements OnInit, OnDestroy {
  responseMessage: string;
  messageSubscription: Subscription;
  success = false;

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.messageSubscription =this.eventService.getResponseMessgage().subscribe((data) => {
      this.responseMessage = data;
      console.log(this.responseMessage)
      this.success = true;
    });
  }

  navigateToEvents() {
    this.router.navigate(['./events']);
  }
  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }
}
