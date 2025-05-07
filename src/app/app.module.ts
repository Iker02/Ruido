import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent],
  imports: [FormsModule, NgxMarqueeComponent, BrowserModule, AppRoutingModule],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
