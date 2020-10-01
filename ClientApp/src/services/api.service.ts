import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDTO } from 'src/domain/carDTO';
import { Car } from 'src/domain/car';
import { Manufacturer } from 'src/domain/manufacturer';
import { CarDetail } from 'src/domain/car-detail';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {

  constructor(private http: HttpClient) { }
  
  getCars(): Observable<CarDTO[]> {

    return this.http.get<CarDTO[]>("/api/car");
  }

  getCar(id: number): Observable<CarDTO> {
    return this.http.get<CarDTO>(`/api/car/${id}`);
  }

  getManufacturers(): Observable<any> {
    return this.http.get<any>("/api/manufacturer");
  }

  getCarDetails(): Observable<any> {
    return this.http.get<any>("/api/cardetail");
  }

  addCar(car: CarDTO): Observable<CarDTO> {
    return this.http.post<CarDTO>("/api/car", car);
  }

  modifyCar(car: CarDTO): Observable<CarDTO> {

    console.log("got: " + JSON.stringify(car))

    return this.http.put<CarDTO>(`/api/car/${car.id}`, car);
  }

  deleteCar(car: CarDTO): Observable<any> {
    return this.http.delete(`/api/car/${car.id}`);
  }

  addManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>("/api/manufacturer", manufacturer);
  }

  deleteManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.delete<Manufacturer>(`/api/manufacturer/${manufacturer.id}`);
  }

  deleteCarDetail(carDetail: CarDetail): Observable<CarDetail> {
    return this.http.delete<CarDetail>(`/api/cardetail/${carDetail.id}`);
  }

  addCarDetail(carDetail: CarDetail): Observable<CarDetail> {
    return this.http.post<CarDetail>("/api/cardetail", carDetail);
  }
}