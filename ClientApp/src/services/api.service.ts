import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/domain/car';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {

  constructor(private http: HttpClient) { }
  
  getCars(): Observable<Car[]> {

    return this.http.get<Car[]>("/api/car");
  }

  getManufacturers(): Observable<any> {
    return this.http.get<any>("/api/manufacturer");
  }

  getModels(): Observable<any> {
    return this.http.get<any>("/api/model");
  }

}