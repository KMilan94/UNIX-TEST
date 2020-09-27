import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { CarDetail } from 'src/domain/car-detail';
import { Manufacturer } from 'src/domain/manufacturer';
import { Apiservice } from 'src/services/api.service';
import { map, switchMap } from 'rxjs/operators';
import { Car } from 'src/domain/car';
import { MatSort, MatTableDataSource } from '@angular/material';

import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []

  cars: Car[] = [];
  manufacturers: Manufacturer[] = [];
  carDetails: CarDetail[] = [];

  constructor(private api: Apiservice) { }

  displayedColumns: string[] = ['id', 'manufacturer.name', 'carDetail.model'];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  initSorting() {
    this.dataSource = new MatTableDataSource(this.cars);
    this.dataSource.sortingDataAccessor = _.get; 
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.subscriptions = [
      combineLatest([this.api.getManufacturers(), this.api.getCarDetails()]).pipe(
        switchMap((tmp) => { 
          this.manufacturers = tmp[0];
          this.carDetails = tmp[1];
          return this.api.getCars();
        })
      )
      .subscribe((cars => {
        for(let i = 0; i != cars.length; ++i) {
          let car = new Car();
          car.id = cars[i].id;
          car.carDetail = this.carDetails.find(c => c.id == cars[i].carDetailID) || {} as CarDetail;
          car.manufacturer = this.manufacturers.find(m => m.id == cars[i].manufacturerID) || {} as Manufacturer;
          this.cars.push(car);
        }

        this.initSorting();
        console.log("Cars: " + JSON.stringify(this.cars))
      }))
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
