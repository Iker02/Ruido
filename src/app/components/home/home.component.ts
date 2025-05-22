import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  mainImage: string = '../../../assets/article-cinematografia.jpg';
  isMouseDown = false;
  contactoForm!: FormGroup;
  selectedCard: any = null;
  isBrowser = false;
  activeIndex = -1;
  intervalId?: any;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.contactoForm = this.fb.group({
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });

    if (this.isBrowser) {
      this.startAutoHover();
    }
  }

  gallery: string[] = [
    '../../../assets/pexels-abbas-mohammed-1990079-3680912.jpg',
    '../../../assets/pexels-gochrisgoxyz-1643409.jpg',
    '../../../assets/pexels-iriser-1379636.jpg',
    '../../../assets/pexels-jplenio-1435075.jpg',
  ];

  cards = [
    {
      title: 'Silent Signals',
      description:
        'A story told entirely through light and motion in a dystopian world. This animated short removing all dialogue, focusing instead on emotion and movement.',
      image: '../../../assets/pexels-moible-1.jpg',
    },
    {
      title: 'Silent Signals',
      description:
        'A story told entirely through light and motion in a dystopian world. This animated short removing all dialogue, focusing instead on emotion and movement.',
      image: '../../../assets/pexels-mobile-2.jpg',
    },
    {
      title: 'Silent Signals',
      description:
        'A story told entirely through light and motion in a dystopian world. This animated short removing all dialogue, focusing instead on emotion and movement.',
      image: '../../../assets/pexels-mobile-3.jpg',
    },
    {
      title: 'Silent Signals',
      description:
        'A story told entirely through light and motion in a dystopian world. This animated short removing all dialogue, focusing instead on emotion and movement.',
      image: '../../../assets/pexels-mobile-4.jpg',
    },
  ];

  // Función para enviar el formulario
  sendEmail(): void {
    if (this.contactoForm.valid) {
      emailjs
        .sendForm(
          'YOUR_SERVICE_ID', // Reemplázalo con tu Service ID de EmailJS
          'YOUR_TEMPLATE_ID', // Reemplázalo con tu Template ID de EmailJS
          this.contactoForm.value, // Los valores del formulario
          'YOUR_PUBLIC_KEY' // Reemplázalo con tu Public Key de EmailJS
        )
        .then(
          () => {
            alert('Mensaje enviado correctamente');
            this.contactoForm.reset(); // Resetear el formulario después de enviar
          },
          (error) => {
            console.error('Error al enviar:', error);
            alert('Hubo un problema al enviar el mensaje');
          }
        );
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

  moveToCenter(index: number, carousel: HTMLElement) {
    // Calculamos el desplazamiento que hace falta para centrar la carta
    const cardWidth = carousel.children[index].clientWidth; // Ancho de la carta
    const carouselWidth = carousel.clientWidth; // Ancho del contenedor del carrusel
    const offset = (carouselWidth - cardWidth) / 2; // Desplazamiento necesario para centrar la carta

    // Calcular la posición de desplazamiento dentro del carrusel
    const newScrollPosition =
      (carousel.children[index] as HTMLElement).offsetLeft - offset;

    // Mover el carrusel a la posición calculada
    carousel.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });

    // Actualizar la carta seleccionada para efectos visuales
    this.selectedCard = this.cards[index];
  }

  getYear(): number {
    return new Date().getFullYear();
  }

  setMainImage(image: string) {
    this.mainImage = image;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoHover(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.cards.length;
    }, 5000);
  }
}
