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

}