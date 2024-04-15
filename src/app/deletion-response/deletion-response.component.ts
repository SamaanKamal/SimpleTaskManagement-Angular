import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../shared/Event-Service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletion-response',
  templateUrl: './deletion-response.component.html',
  styleUrls: ['./deletion-response.component.css']
})
export class DeletionResponseComponent implements OnInit,OnDestroy {
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
