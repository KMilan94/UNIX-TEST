import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, Subscription, zip } from 'rxjs';
import { CarDetail } from 'src/domain/car-detail';
import { Manufacturer } from 'src/domain/manufacturer';
import { Apiservice } from 'src/services/api.service';
import { map, switchMap } from 'rxjs/operators';
import { Car } from 'src/domain/car';
import { MatDialog, MatDialogRef, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';

import { AddDialogComponent } from './add-dialog/add-dialog.component';

import * as _ from 'lodash';
import { CarDTO } from 'src/domain/carDTO';
import { Router } from '@angular/router';

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

  constructor(private api: Apiservice, private dialog: MatDialog, private router: Router) { }

  displayedColumns: string[] = ['id', 'manufacturer.name', 'carDetail.model', 'actions'];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {

    this.subscriptions = [

      forkJoin([this.api.getManufacturers(), this.api.getCarDetails(), this.api.getCars()]).subscribe((tmp) => {

        this.manufacturers = tmp[0];
        this.carDetails = tmp[1];

        for(let i = 0; i != tmp[2].length; ++i) {
          let car = new Car();
          car.id = tmp[2][i].id;
          car.carDetail = this.carDetails.find(c => c.id == tmp[2][i].carDetailID) || {} as CarDetail;
          car.manufacturer = this.manufacturers.find(m => m.id == tmp[2][i].manufacturerID) || {} as Manufacturer;
          this.cars.push(car);
        }

        this.initSorting();
        console.log("Cars: " + JSON.stringify(this.cars))
      })
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

  modifyRecord(car: CarDTO) {

    console.log("Result: " + JSON.stringify(car))

    this.subscriptions.push(
      this.api.modifyCar(car).subscribe((res) => {

        console.log("Res: " + JSON.stringify(res))
        var index = this.cars.findIndex(x => x.id == car.id);

        let tmp = new Car();
        tmp.id = car.id;
        tmp.carDetail = this.carDetails.find(c => c.id == car.carDetailID) || {} as CarDetail;
        tmp.manufacturer = this.manufacturers.find(m => m.id == car.manufacturerID) || {} as Manufacturer;

        this.cars[index] = tmp;
        this.dataSource.data = this.cars;

      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }

  // Helper methods

  detail(element) {
    console.log("Element: " + JSON.stringify(element))

    this.router.navigate(["/car-detail/" + element.id])
  }

  applyFilter($event) {

    if(!$event) {
      this.dataSource.filter = '';
    } else {
      console.log("searching: " + $event + " in models");
      this.dataSource.filter = $event;
    }
  }
  
  initSorting() {
    this.dataSource = new MatTableDataSource(this.cars);
    this.dataSource.sortingDataAccessor = _.get; 
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Car, filter: string) => {
      return data.carDetail.model.toLowerCase().startsWith(filter.toLowerCase());
     };
  }

  addRecord() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {manufacturers: this.manufacturers, carDetails: this.carDetails, mode: "add" }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result && !!result.manufacturerID && !!result.carDetailID) this.saveRecord(result);
      })
    );
  }

  openEditDialog(element: Car): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {manufacturers: this.manufacturers, carDetails: this.carDetails, mode: "edit", element: element }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result && !!result.manufacturerID && !!result.carDetailID) this.modifyRecord(result);
      })
    );
  }

  openDeleteDialog(car: CarDTO) {

    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: { mode: "delete" }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.deleteRecord(car);
        }
      })
    );
  }

  deleteRecord(car: CarDTO) {

    this.api.deleteCar(car).subscribe((res) => {

      this.cars = this.cars.filter(obj => obj.id !== res.id);
      this.dataSource.data = this.cars;

    }, (error) => {
      console.log("Error: " + JSON.stringify(error))
    })
  }
}