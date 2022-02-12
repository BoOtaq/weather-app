import { Component, OnInit } from '@angular/core';
import { TransferDataService } from 'src/app/services/transfer-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  isVisible = false;

  name: any;
  message: string = '';

  
  constructor(private shared:TransferDataService) { }

//   getValue(val:string){
//       console.warn(val)
//       this.cityName = val;
// }

getCity(val:any){
  this.message=val;
  this.shared.message.next(this.message);
  
}

  ngOnInit(): void {
    this.shared.message.next(this.message);
  }

  toggleOn(){
    this.isVisible=!this.isVisible;
  }

}
