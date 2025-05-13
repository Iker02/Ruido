import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'ruido';
  isMenuOpen = false;
  isScrolled = false;
  mostrarPopup = false;
  mostrarPopupW = false;
  ocultarPopup = true;
  mensaje = 'Hola, me gustaría recibir información :)';
  numeroWhatsapp = '34644356186'; // Reemplaza con el número de fede

  constructor(
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    this.spinner.show();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('load', () => {
        this.spinner.hide();
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
    
    // Si el menú está abierto
    if (this.isMenuOpen) {
      const clickedInsideMenu = target.closest('#sidebar-menu');
      
      // Si NO se hizo clic dentro del menú
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

  cerrarPopupConAnimacion() {
    this.mostrarPopupW = false;
    setTimeout(() => {
      this.ocultarPopup = true;
    }, 300); // igual a la duración de la animación
  }
}
