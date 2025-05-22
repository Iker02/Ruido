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
      zoom: 15,
    });

    // 📍 Crear ícono personalizado
    const customIcon = L.icon({
      iconUrl: '../../assets/marcador-de-posicion.png',      
      iconSize: [32, 40],                    
      iconAnchor: [16, 40],                    
      popupAnchor: [0, -40],               
    });

    // 📌 Coordenadas de Puerta del Sol
    const puertaDelSolCoords = [40.4169, -3.7036];

    // 🧷 Añadir el marcador con el ícono personalizado
    L.marker(puertaDelSolCoords, { icon: customIcon })
      .addTo(map)
      .bindPopup('📍 Puerta del Sol, Madrid')
      .openPopup();
  }
}
