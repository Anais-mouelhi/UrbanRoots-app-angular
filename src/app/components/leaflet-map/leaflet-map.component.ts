import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.fullscreen';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, BottomBarComponent]
})
export class LeafletMapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markersLayerGroup!: L.MarkerClusterGroup;
  public searchQuery: string = '';
  public filteredGardens: any[] = [];
  public selectedGarden: any = null;
  public filters = {
    typeprojet: '',
    typeactivite: '',
    techniqueprod: ''
  };
  private urbanSpaces: any[] = [];
  public resultsCount: number = 0;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Clean up the map instance
    }
  }

  private getCurrentPosition(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
            observer.complete();
          },
          (error: GeolocationPositionError) => observer.error(error)
        );
      } else {
        observer.error('Geolocation not available');
      }
    });
  }

  private loadMap(): void {
    if (this.map) {
      return; // Map is already initialized
    }

    this.map = L.map('map', {
      center: [46.603354, 1.888334],
      zoom: 10 // Niveau de zoom initial
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/chainez-mlh/clu751mt600dd01pieymr79xk/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhaW5lei1tbGgiLCJhIjoiY2x5aW5xNTZlMGZ6ajJyczg4ZjdncWk5NyJ9.ZDbzpR-2xmnBF2NeiFwpug', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);



    this.markersLayerGroup = new window.L.MarkerClusterGroup(); // Initialize MarkerClusterGroup
    this.map.addLayer(this.markersLayerGroup); // Add to the map

    this.loadMarkers();

    this.getCurrentPosition().subscribe(
      (position: any) => {
        const userIcon = L.icon({
          iconUrl: 'assets/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        const userMarker = L.marker([position.latitude, position.longitude], { icon: userIcon });

        L.circle([position.latitude, position.longitude], {
          radius: position.accuracy / 2,
          color: 'red',
          fillColor: 'red',
          fillOpacity: 0.2,
        }).addTo(this.map);

        userMarker.addTo(this.map);
        this.map.setView([position.latitude, position.longitude], 13); // Center the map on the user's location
      },
      (error: any) => {
        console.error('Failed to get user position:', error);
      }
    );
  }

  private loadMarkers(): void {
    this.http.get('https://www.observatoire-agriculture-urbaine.org/json/listsites.php?v=1720789221209')
      .subscribe(
        (data: any) => {
          this.urbanSpaces = data; // Store the urban spaces data
          this.applyFilters(); // Apply filters when the data is loaded
        },
        (error: any) => {
          console.error('Failed to load markers:', error);
        }
      );
  }

  private createPopupContent(garden: any): string {
    return `
     
    `;
  }

  private updatePopupContent(garden: any): void {
    this.selectedGarden = garden;
    console.log(this.selectedGarden);
  }

  public applyFilters(): void {
    this.filteredGardens = this.urbanSpaces.filter(space => {
      const matchesTypeProjet = this.filters.typeprojet ? space.list_typeprojet.includes(this.filters.typeprojet) : true;
      const matchesTypeActivite = this.filters.typeactivite ? space.list_typeactivite.includes(this.filters.typeactivite) : true;
      const matchesTechniqueProd = this.filters.techniqueprod ? space.list_techniqueprod.includes(this.filters.techniqueprod) : true;
      return matchesTypeProjet && matchesTypeActivite && matchesTechniqueProd;
    });
    this.resultsCount = this.filteredGardens.length; // Update the number of results
    this.updateMapMarkers();
  }

  public resetFilters(): void {
    this.filters = {
      typeprojet: '',
      typeactivite: '',
      techniqueprod: ''
    };
    this.applyFilters();
  }

  private updateMapMarkers(): void {
    this.markersLayerGroup.clearLayers(); // Clear existing markers

    const gardenIcon = L.icon({
      iconUrl: 'assets/images/garden-icon.png',
      iconSize: [70, 70],
      iconAnchor: [35, 70], // Center the icon properly
      popupAnchor: [0, -70], // Adjust popup position relative to icon
    });

    this.filteredGardens.forEach((garden: any) => {
      const gardenMarker = L.marker([parseFloat(garden.lat), parseFloat(garden.lng)], { icon: gardenIcon })
        
        .on('click', () => this.updatePopupContent(garden));

      this.markersLayerGroup.addLayer(gardenMarker); // Add to MarkerClusterGroup
    });
  }


  public goToGarden(): void {
    // Filter gardens based on the search query
    this.filteredGardens = this.urbanSpaces.filter(garden =>
      garden.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.resultsCount = this.filteredGardens.length;
  
    // Update the markers displayed on the map
    this.updateMapMarkers();
  
    // Center the map on the first found garden, if available
    if (this.filteredGardens.length > 0) {
      const firstGarden = this.filteredGardens[0];
      const gardenLatLng: [number, number] = [parseFloat(firstGarden.lat), parseFloat(firstGarden.lng)];
  
      // Center the map and adjust the zoom level
      this.map.setView(gardenLatLng, 13); // Adjust the zoom level as needed
  
      // Display garden information in the popup
      this.updatePopupContent(firstGarden);
  
      // Optionally: Show the popup immediately
      L.marker(gardenLatLng).addTo(this.map)
        
       
    } else {
      // Optionally: add logic to handle cases where no garden is found
      console.log('No garden found for the query:', this.searchQuery);
      // You can display an error message or other notification here
    }
  }
  
}
