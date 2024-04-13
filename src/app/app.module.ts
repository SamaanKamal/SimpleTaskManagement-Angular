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

@NgModule({
  declarations: [AppComponent, EventsComponent, HeaderComponent,EventFormComponent],
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
