import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Manufacturer } from 'src/domain/manufacturer';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Apiservice } from 'src/services/api.service';
import { ManufacturerDialogComponent } from './manufacturer-dialog/manufacturer-dialog.component';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource;

  subscriptions: Subscription[] = [];
  manufacturers: Manufacturer[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private api: Apiservice, private dialog: MatDialog) { }

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

  saveRecord(manufacturer: Manufacturer) {

    this.subscriptions.push(

      this.api.addManufacturer(manufacturer).subscribe((res) => {

        manufacturer.id = res.id;
        this.manufacturers.push(manufacturer);
        this.dataSource.data = this.manufacturers;

      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManufacturerDialogComponent, {
      width: '250px',
      data: { mode: "add" }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result) this.saveRecord(result);
      })
    );
  }

  deleteRecord(element: Manufacturer) {
    this.subscriptions.push(
      this.api.deleteManufacturer(element).subscribe((res) => {

        if(res) {
          this.manufacturers = this.manufacturers.filter(obj => obj.id !== res.id);
          this.dataSource.data = this.manufacturers;
        }

      }, (error) => {
        console.warn("Error: " + JSON.stringify(error));
      })
    )
  }

  openEditDialog(element: Manufacturer): void {

    const dialogRef = this.dialog.open(ManufacturerDialogComponent, {
      width: '250px',
      data: { mode: "edit", element: <Manufacturer>JSON.parse(JSON.stringify(element)) }
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

  modifyRecord(manufacturer: Manufacturer) {

    console.log("Result: " + JSON.stringify(manufacturer))

    this.subscriptions.push(
      this.api.modifyManufacturer(manufacturer).subscribe(() => {

        var index = this.manufacturers.findIndex(x => x.id == manufacturer.id);
        this.manufacturers[index] = manufacturer;
        this.dataSource.data = this.manufacturers;

      }, (error) => {
        console.log("Error: " + JSON.stringify(error))
      })
    )
  }
}