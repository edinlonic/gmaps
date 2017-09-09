import { Injectable } from '@angular/core';
import { MapData} from '../shared/mapData.model';
import { SAVED_DATA } from '../shared/mapData';

@Injectable()
export class DataService {

  constructor() { }

  getData(): MapData[]{
    return SAVED_DATA.slice(0);
  }

}
