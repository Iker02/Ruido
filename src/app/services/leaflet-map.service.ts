import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletMapService {
  async initMap(container: HTMLElement): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = (leafletModule as any).default || leafletModule;

    const map = new L.Map(container, {
      center: [40.4168, -3.7038], // Centro general de Madrid
      zoom: 15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // 📍 Añadir marcador en Puerta del Sol
    const puertaDelSolCoords = [40.4169, -3.7036];
    L.marker(puertaDelSolCoords)
      .addTo(map)
      .bindPopup('📍 Puerta del Sol, Madrid')
      .openPopup();
  }
}
