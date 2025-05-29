import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  HostListener,
  Inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  dropdownOpen = false;
  mensaje = 'Hola, me gustaría recibir información sobre vuestra empresa :)';
  numeroWhatsapp = '34644356186'; // Reemplazar con el número de fede

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private translate: TranslateService
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

    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('lang') || 'es';
      this.translate.use(lang);
    }
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => {
            const el = document.getElementById(fragment);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      }
    });
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
        this.dropdownOpen = false; 
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

  navigateToContact() {
    const contactSection = document.getElementById('formulario');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  switchLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

    toggleDropdownOpen() {
    this.dropdownOpen = this.dropdownOpen = true;
  }
}
