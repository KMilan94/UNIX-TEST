import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Manufacturer } from 'src/domain/manufacturer';

@Component({
  selector: 'app-manufacturer-dialog',
  templateUrl: './manufacturer-dialog.component.html',
  styleUrls: ['./manufacturer-dialog.component.scss']
})
export class ManufacturerDialogComponent {

  mode: string = "add";
  manufacturer = {} as Manufacturer;

  constructor(
    public dialogRef: MatDialogRef<ManufacturerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {

      console.log("Data: " + JSON.stringify(data))
        this.mode = data.mode;
        this.manufacturer = data.element || {} as Manufacturer;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.manufacturer);
  }
}

