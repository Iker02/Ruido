import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SavaeComponent } from './components/savae/savae.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent, SavaeComponent],
  imports: [
    FormsModule,
    NgxMarqueeComponent,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
