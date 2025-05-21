import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      const map = L.map('map', {
        center: [40.4168, -3.7038],
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: '../../../assets/marcador-de-posicion.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      L.marker([40.4168, -3.7038], { icon: customIcon })
        .addTo(map)
        .bindPopup('📍 Aquí estamos nosotros')
        .openPopup();

      // Botones zoom personalizados
      const zoomInButton = document.getElementById('zoom-in');
      const zoomOutButton = document.getElementById('zoom-out');

      if (zoomInButton && zoomOutButton) {
        zoomInButton.addEventListener('click', () => map.zoomIn());
        zoomOutButton.addEventListener('click', () => map.zoomOut());
      }
    }
  }
}
