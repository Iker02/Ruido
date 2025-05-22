import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletMapService {
async initMap(container: HTMLElement): Promise<void> {
  const leafletModule = await import('leaflet');
  const L = (leafletModule as any).default || leafletModule;

  const map = new L.Map(container, {
    center: [51.505, -0.09],
    zoom: 13,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
}

}
