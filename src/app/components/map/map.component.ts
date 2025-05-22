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
      const leaflet = await import('leaflet');
      const { icon, marker, tileLayer, Map } = leaflet;

      const mapInstance = new Map('map', {
        center: [40.4168, -3.7038],
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      const customIcon = icon({
        iconUrl: '../../../assets/marcador-de-posicion.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      marker([40.4168, -3.7038], { icon: customIcon })
        .addTo(mapInstance)
        .bindPopup('📍 Aquí estamos nosotros')
        .openPopup();

      // Botones zoom personalizados
      const zoomInButton = document.getElementById('zoom-in');
      const zoomOutButton = document.getElementById('zoom-out');

      if (zoomInButton && zoomOutButton) {
        zoomInButton.addEventListener('click', () => mapInstance.zoomIn());
        zoomOutButton.addEventListener('click', () => mapInstance.zoomOut());
      }
    }
  }
}
