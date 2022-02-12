import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TransferDataService } from 'src/app/services/transfer-data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {
  city: string | undefined;
  lat: number | undefined;
  lon: number | undefined;
  weather: any;

 
  live_time: any | null;
  constructor(
    private transferDataService: TransferDataService,
    public datepipe: DatePipe,
    private http: HttpClient
  ) {
    let currentDateTime = this.datepipe.transform((new Date), 'h:mm:ss dd/MM/yyyy')
    this.live_time = currentDateTime;
   }

  ngOnInit(): void {
  //  this.city = this.transferDataService.getMessage()
  this.transferDataService.message.subscribe((data) => {
    this.city = data;
    console.log("Is it working now? -", this.city)
    this.getCity(this.city);
  });
   console.log("Hello from main-info", this.city)
   this.transferDataService.getWeatherDataByCoords(44.229444, 21.197222).subscribe(console.log);
   this.getLocation();
  }

  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=> {
        this.lat = 44.229444;
        this.lon = 21.197222;
        this.transferDataService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data=>{
          this.weather = data;
          let sunriseTime = new Date(this.weather.sys.sunrise * 1000);
          this.weather.sunrise_time = sunriseTime.toLocaleTimeString();
          let sunsetTime = new Date(this.weather.sys.sunset * 1000);
          this.weather.sunset_time = sunsetTime.toLocaleTimeString();
          let currentDate = new Date();
          this.weather.isDay = (currentDate.getTime() < sunsetTime.getTime());
          this.weather.temp_celcius = (this.weather.main.temp).toFixed(0);
          this.weather.temp_min = (this.weather.main.temp_min).toFixed(0);
          this.weather.temp_max = (this.weather.main.temp_max).toFixed(0);
          this.weather.temp_feels_like = (this.weather.main.feels_like).toFixed(0);
          this.weather.humidity = (this.weather.main.humidity);
          this.weather.wind = (this.weather.wind.speed * 1.609344).toFixed(1);
          this.weather.visibility = (this.weather.visibility / 1000).toFixed(0);
          this.weather.pressure = (this.weather.main.pressure).toFixed(0);
          this.weather.citySearch = (this.weather.name);
          this.weather.country = (this.weather.sys.country);
        })
      })
    }
  }

  getCity(city: string){
    // if(!this.city) {
    //   return;
    // }
    this.transferDataService.getWeatherDataByCityName(city)
    .pipe(
      debounceTime(1000)
    )
    .subscribe(data=>{
      this.weather = data;
      let sunriseTime = new Date(this.weather.sys.sunrise * 1000);
          this.weather.sunrise_time = sunriseTime.toLocaleTimeString();
          let sunsetTime = new Date(this.weather.sys.sunset * 1000);
          this.weather.sunset_time = sunsetTime.toLocaleTimeString();
          let currentDate = new Date();
          this.weather.isDay = (currentDate.getTime() < sunsetTime.getTime());
          this.weather.temp_celcius = (this.weather.main.temp).toFixed(0);
          this.weather.temp_min = (this.weather.main.temp_min).toFixed(0);
          this.weather.temp_max = (this.weather.main.temp_max).toFixed(0);
          this.weather.temp_feels_like = (this.weather.main.feels_like).toFixed(0);
          this.weather.humidity = (this.weather.main.humidity);
          this.weather.wind = (this.weather.wind.speed * 1.609344).toFixed(1);
          this.weather.visibility = (this.weather.visibility / 1000).toFixed(0);
          this.weather.pressure = (this.weather.main.pressure).toFixed(0);
          this.weather.citySearch = (this.weather.name);
          this.weather.country = (this.weather.sys.country);
    })
  }
  
  refresh() {
    window.location.reload();
  }
  }

  // setWeatherData(data: any){
  //   this.WeatherData = data;
  //   let sunriseTime = new Date(this.WeatherData.sys.sunrise * 1000);
  //   this.WeatherData.sunrise_time = sunriseTime.toLocaleTimeString();
  //   let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
  //   this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
  //   let currentDate = new Date();
  //   this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
  //   this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
  //   this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
  //   this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
  //   this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  //   this.WeatherData.humidity = (this.WeatherData.main.humidity);
  //   this.WeatherData.wind = (this.WeatherData.wind.speed * 1.609344).toFixed(1);
  //   this.WeatherData.visibility = (this.WeatherData.visibility / 1000).toFixed(0);
  //   this.WeatherData.pressure = (this.WeatherData.main.pressure).toFixed(0);
  //   this.WeatherData.citySearch = (this.WeatherData.name);
  //   this.WeatherData.country = (this.WeatherData.sys.country);
    // This code is ok, but it doesn't update the time in REALTIME
    // let liveTime = new Date(this.WeatherData.dt * 1000);
    // this.WeatherData.live_time = liveTime.toLocaleTimeString();
  // }
