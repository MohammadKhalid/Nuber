import { Component, OnInit } from '@angular/core';
import { Bookings } from './booking.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  bookings$: Bookings[];

  constructor(private dataService: DataService){}

  ngOnInit(){
    return this.dataService.getBookings()
      .subscribe(data => this.bookings$ = data);
      
  }
}
