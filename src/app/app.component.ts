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
  distanceData: any;

  lat: number;
  lng: number;

  styles = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 40 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -10 }, { "lightness": 30 }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 10 }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 60 }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }]


  markers: any = [];

  stops: any = [];

  distance: any = {};

  zoom: number = 12;
  scrollwheel: boolean = false;

  doneMarkerImg: string = 'assets/img/Done-Marker.png';
  pendingMarkerImg: string = 'assets/img/RedMarkerWithNumber.png';

  constructor(private _dataService: DataService){
    this.getMapData = this._dataService.getFileData()
      .subscribe(
        (res) => {
          this.distanceData = res;

          console.log(this.distanceData);

          this.lat = this.distanceData.pickup.location.lat;
          this.lng = this.distanceData.pickup.location.lng;

          this.markers.push(this.distanceData.pickup, this.distanceData.dropoff);
          this.distanceData.stops.forEach((obj, index) => {
            this.markers.push(obj);
          })

          for (let i = 0; i < this.distanceData.stops.length - 1; i++) {
            this.stops.push(
              {
                lat: this.distanceData.stops[i].location.lat,
                lng: this.distanceData.stops[i].location.lng,
                dlat: this.distanceData.stops[i+1].location.lat,
                dlng: this.distanceData.stops[i+1].location.lng
              })
          };

          console.log(this.distance);

        },
        (error) => console.log("error : " + error),
        () => console.log('Data request complete.')
      );
  }

  ngOnInit(){

  }

}
