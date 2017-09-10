import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import { DirectionsMapDirective } from './directives/map-directions.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  getMapData: any;
  mapConfing: any;

  lat: number;
  lng: number;

  styles = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 40 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -10 }, { "lightness": 30 }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 10 }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 60 }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }]


  markers: any = [];
  routes: any = [];

  zoom: number = 12;
  scrollwheel: boolean = false;

  doneMarkerImg: string = 'assets/img/Done-Marker.png';
  pendingMarkerImg: string = 'assets/img/RedMarkerWithNumber.png';

  constructor(private _dataService: DataService){
    this.getMapData = this._dataService.getFileData()
      .subscribe(
        (res) => {
          this.mapConfing = res;

          this.lat = this.mapConfing.pickup.location.lat;
          this.lng = this.mapConfing.pickup.location.lng;

          this.markers.push(this.mapConfing.pickup, this.mapConfing.dropoff);
          this.mapConfing.stops.forEach((obj, index) => {
            this.markers.push(obj);
          })

          this.markers.forEach((obj, index) => {
            this.routes.push(
              {
                origin_lat: obj.location.lat,
                origin_lng: obj.location.lng,
                destination_lat: obj.location.lat.index,
                destination_lng: obj.location.lng.index
              }
            )
          })

          console.log(this.routes);

        },
        (error) => console.log("error : " + error),
        () => console.log('Data request complete.')
      );
  }

  ngOnInit(){

  }

}
