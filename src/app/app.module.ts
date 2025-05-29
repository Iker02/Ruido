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
import { AboutUsCardComponent } from './components/about-us-card/about-us-card.component';
import { MapComponent } from './components/map/map.component';
import { TeamComponent } from './components/team/team.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ProjectsComponent,
    AboutUsComponent,
    ServiciosComponent,
  ],
  imports: [
    FormsModule,
    NgxMarqueeComponent,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AboutUsCardComponent,
    MapComponent,
    TeamComponent,
    HttpClientModule,
   TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
