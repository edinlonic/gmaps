import {Component, OnInit} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {DataService} from "./services/data.service";
import { DirectionsMapDirective } from './directives/map-directions.directive';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // MAP CONFIGURATION

  lat: number;
  lng: number;
  styles = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 40 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -10 }, { "lightness": 30 }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 10 }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 60 }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }]
  zoom: number = 12;
  scrollwheel: boolean = false;

  // MARKER ICON CONFIGURATION

  doneMarkerImg: string = 'assets/img/Done-Marker.png';
  pendingMarkerImg: string = 'assets/img/RedMarkerWithNumber.png';

  // VARIABLES

  getMapData: any;
  distanceData: any;
  markers: any = [];
  routes: any = [];

  constructor(private _dataService: DataService){
    // subscribe to service observer
    this.getMapData = this._dataService.getFileData()
      .subscribe(
        (res) => {
          this.distanceData = res;

          // Setting up map center location (pickup position)
          this.lat = this.distanceData.pickup.location.lat;
          this.lng = this.distanceData.pickup.location.lng;

          // Pushing to array with all truck positions (pickup, dropoff, stops)
          this.markers.push(this.distanceData.pickup, this.distanceData.dropoff);
          this.distanceData.stops.forEach((obj, index) => {
            this.markers.push(obj);
          })

          // Making an arrays with origin and destination coordinates
          console.log(this.markers);
          for (let i = 0; i < this.markers.length - 1; i++) {
              this.routes.push(
                [[this.markers[i].location.lat],[this.markers[i].location.lng],
                [this.markers[i+1].location.lat], [this.markers[i+1].location.lng]]
              )
          }
        },
        (error) => console.log("error : " + error),
        () => console.log('Data request complete.')
      );
  }
  ngOnInit(){
  }
}
