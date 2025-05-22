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
      zoom: 16,
      scrollWheelZoom: false,    
      doubleClickZoom: false,   
      dragging: false,           
      zoomControl: true         
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'assets/marcador-de-posicion.png', 
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const puertaDelSolCoords = [40.4169, -3.7036];

    L.marker(puertaDelSolCoords, { icon: customIcon })
      .addTo(map)
      .bindPopup('📍 Puerta del Sol, Madrid')
      .openPopup();
  }
}
