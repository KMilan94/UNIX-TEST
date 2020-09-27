import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Manufacturer } from 'src/domain/manufacturer';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Apiservice } from 'src/services/api.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent {

  displayedColumns: string[] = ['id', 'name'];
  dataSource;

  subscriptions: Subscription[] = [];
  manufacturers: Manufacturer[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private api: Apiservice) { }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [
      this.api.getManufacturers().subscribe((manufacturers) => {
        this.manufacturers = manufacturers;
        this.initSorting();
      })
    ]
  }

  initSorting() {
    this.dataSource = new MatTableDataSource(this.manufacturers);
    this.dataSource.sort = this.sort;
  }
}

