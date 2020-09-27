import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/domain/car';
import { CarDTO } from 'src/domain/carDTO';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {

  constructor(private http: HttpClient) { }
  
  getCars(): Observable<CarDTO[]> {

    return this.http.get<CarDTO[]>("/api/car");
  }

  getManufacturers(): Observable<any> {
    return this.http.get<any>("/api/manufacturer");
  }

  getCarDetails(): Observable<any> {
    return this.http.get<any>("/api/cardetail");
  }

}