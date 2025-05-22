import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletMapService {
  async initMap(container: HTMLElement): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = (leafletModule as any).default || leafletModule;

    const map = new L.Map(container, {
      center: [40.4168, -3.7038], 
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }
}
