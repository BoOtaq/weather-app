import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransferDataService {
    url: string = 'https://api.openweathermap.org/data/2.5/weather';
    apiKey: string = '911c116b3a998d8d8fc799290c64b418';
    constructor(private http:HttpClient) {
    }

    message: BehaviorSubject<string> = new BehaviorSubject("");

    // setMessage(data: string | undefined){
    //     this.message=data
    //     console.log("Howdy from the service :", this.message)
    // }

    // getMessage(){
    //     return this.message;
    // }

    getWeatherDataByCoords(lat: number, lon: number) {
      let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey)

      return this.http.get(this.url, { params })
    }

    getWeatherDataByCityName(city: string){
        let params = new HttpParams()
        .set('q', city)
        .set('units', 'metric')
        .set('appid', this.apiKey)

        return this.http.get(this.url, { params });
    }
    }
