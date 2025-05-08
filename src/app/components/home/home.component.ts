import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Asegúrate de que es "styleUrls" y no "styleUrl"
})
export class HomeComponent  {
  @ViewChild('marqueeContent') marqueeContent!: ElementRef;

  private currentOffset: number = 0;
  private speed: number = 0.5; // Controla la velocidad del desplazamiento


}
