import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { CarDetail } from 'src/domain/car-detail';
import { Apiservice } from 'src/services/api.service';
import { CarDetailDialogComponent } from './car-detail-dialog/car-detail-dialog.component';

@Component({
  selector: 'app-car-detail-list',
  templateUrl: './car-detail-list.component.html',
  styleUrls: ['./car-detail-list.component.scss']
})
export class CarDetailListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'model', 'color', 'fuel', 'actions' ];
  dataSource;

  subscriptions: Subscription[] = [];
  carDetails: CarDetail[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private api: Apiservice, private dialog: MatDialog) { }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [
      this.api.getCarDetails().subscribe((carDetails) => {
        this.carDetails = carDetails;
        this.initSorting();
      })
    ]
  }

  initSorting() {
    this.dataSource = new MatTableDataSource(this.carDetails);
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CarDetailDialogComponent, {
      width: '250px',
      data: { mode: "add" }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result) this.saveRecord(result);
      })
    );
  }

  saveRecord(carDetail: CarDetail) {


    this.subscriptions.push(

      this.api.addCarDetail(carDetail).subscribe((res) => {

        carDetail.id = res.id;
        this.carDetails.push(carDetail);
        this.dataSource.data = this.carDetails;

      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }

  deleteRecord(element: CarDetail) {
    this.subscriptions.push(
      this.api.deleteCarDetail(element).subscribe((res) => {

        this.carDetails = this.carDetails.filter(obj => obj.id !== res.id);
        this.dataSource.data = this.carDetails;

      }, (error) => {
        console.warn("Error: " + JSON.stringify(error));
      })
    )
  }

  openEditDialog(element: CarDetail): void {

    const dialogRef = this.dialog.open(CarDetailDialogComponent, {
      width: '250px',
      data: { mode: "edit", element: <CarDetail>JSON.parse(JSON.stringify(element)) }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {

        if(result) {
          console.log("Result: " + JSON.stringify(result))
          this.modifyRecord(result);
        }
      })
    );
  }

  modifyRecord(carDetail: CarDetail) {

    console.log("Result: " + JSON.stringify(carDetail))

    this.subscriptions.push(
      this.api.modifyCarDetail(carDetail).subscribe(() => {

        var index = this.carDetails.findIndex(x => x.id == carDetail.id);
        this.carDetails[index] = carDetail;
        this.dataSource.data = this.carDetails;

      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }
}
