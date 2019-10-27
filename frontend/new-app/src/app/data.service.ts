import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookings } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = 'http://localhost:3000/api/bookings';
  
  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get<Bookings[]>(this.apiURL);
  }
}
