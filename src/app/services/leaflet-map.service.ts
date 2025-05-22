import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletMapService {
  async initMap(container: HTMLElement): Promise<void> {
    const L = await import('leaflet');

    const mapInstance = new L.Map(container, {
      center: [51.505, -0.09],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);
  }
}
