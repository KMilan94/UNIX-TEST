import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { CarDetail } from 'src/domain/car-detail';
import { Manufacturer } from 'src/domain/manufacturer';
import { Apiservice } from 'src/services/api.service';
import { map, switchMap } from 'rxjs/operators';
import { Car } from 'src/domain/car';
import { MatDialog, MatDialogRef, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';

import { AddDialogComponent } from './add-dialog/add-dialog.component';

import * as _ from 'lodash';
import { CarDTO } from 'src/domain/carDTO';

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

  constructor(private api: Apiservice, private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'manufacturer.name', 'carDetail.model', 'actions'];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {

    // ToDo: refactor with map

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

  // CRUD
  
  saveRecord(car: CarDTO) {
    this.subscriptions.push(
      this.api.addCar(car).subscribe((res) => {

        let car = new Car();
        car.id = res.id;
        car.carDetail = this.carDetails.find(c => c.id == res.carDetailID) || {} as CarDetail;
        car.manufacturer = this.manufacturers.find(m => m.id == res.manufacturerID) || {} as Manufacturer;
        this.cars.push(car);
        this.dataSource.data = this.cars;


      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }

  deleteRecord(car: CarDTO) {
    this.subscriptions.push(
      this.api.deleteCar(car).subscribe((res) => {

        let index = this.cars.findIndex(car => car.id = res.id); 
        this.cars.splice(index, 1);
        this.dataSource.data = this.cars;

      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }

  modifyRecord(car: CarDTO) {
    
  }

  // Helper methods
  
  initSorting() {
    this.dataSource = new MatTableDataSource(this.cars);
    this.dataSource.sortingDataAccessor = _.get; 
    this.dataSource.sort = this.sort;
  }

  addRecord() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {manufacturers: this.manufacturers, carDetails: this.carDetails}
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result.manufacturerID && result.carDetailID) this.saveRecord(result);
      })
    );
  }
}