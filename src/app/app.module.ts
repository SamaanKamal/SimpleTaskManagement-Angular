import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { EventFormComponent } from './event-form/event-form.component';
import { EventIneterceptorService } from './shared/EventInterceptor.service';
import { EventUpdateFormComponent } from './event-update-form/event-update-form.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { UpdateResponseComponent } from './update-response/update-response.component';
import { CreationResponseComponent } from './creation-response/creation-response.component';
import { DeletionResponseComponent } from './deletion-response/deletion-response.component';

@NgModule({
  declarations: [AppComponent, EventsComponent, HeaderComponent,EventFormComponent, EventUpdateFormComponent, LoadingSpinnerComponent, UpdateResponseComponent, CreationResponseComponent, DeletionResponseComponent],
  imports: [BrowserModule, FormsModule,HttpClientModule, AppRoutingModule,],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EventIneterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
