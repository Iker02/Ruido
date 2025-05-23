import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'ruido';
  isMenuOpen = false;
  isScrolled = false;
  mostrarPopup = false;
  mostrarPopupW = false;
  ocultarPopup = true;
  mensaje = 'Hola, me gustaría recibir información sobre vuestra empresa :)';
  numeroWhatsapp = '34644356186'; // Reemplazar con el número de fede

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.onStable.pipe(take(1)).subscribe(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.closest('#menu-toggle-btn')) {
      return;
    }

    if (this.isMenuOpen) {
      const clickedInsideMenu = target.closest('#sidebar-menu');
      if (!clickedInsideMenu) {
        this.isMenuOpen = false;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  enviarMensaje() {
    const texto = encodeURIComponent(this.mensaje);
    const url = `https://wa.me/${this.numeroWhatsapp}?text=${texto}`;
    window.open(url, '_blank');
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}
