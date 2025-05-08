import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('marqueeContent') marqueeContent!: ElementRef;

  private currentOffset: number = 0;
  private speed: number = 0.5; // Controla la velocidad del desplazamiento

  ngAfterViewInit(): void {
    this.startMarquee();
  }

  startMarquee() {
    const content = this.marqueeContent.nativeElement;
    const containerWidth = content.offsetWidth;

    const moveMarquee = () => {
      // Desplazamos el contenido
      this.currentOffset -= this.speed;

      // Si el contenido se ha desplazado completamente hacia la izquierda, lo reiniciamos
      if (this.currentOffset <= -containerWidth) {
        this.currentOffset = 0;
      }

      // Aplicamos el desplazamiento
      content.style.transform = `translateX(${this.currentOffset}px)`;

      // Llamamos de nuevo a moveMarquee para el siguiente cuadro
      requestAnimationFrame(moveMarquee);
    };

    // Iniciamos la animación
    requestAnimationFrame(moveMarquee);
  }
}