import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { CarDetail } from 'src/domain/car-detail';
import { Apiservice } from 'src/services/api.service';

@Component({
  selector: 'app-car-detail-list',
  templateUrl: './car-detail-list.component.html',
  styleUrls: ['./car-detail-list.component.scss']
})
export class CarDetailListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'model', 'color', 'fuel'];
  dataSource;

  subscriptions: Subscription[] = [];
  carDetails: CarDetail[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private api: Apiservice) { }


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
}
