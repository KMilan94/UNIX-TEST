import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarDetail } from 'src/domain/car-detail';

@Component({
  selector: 'app-car-detail-dialog',
  templateUrl: './car-detail-dialog.component.html',
  styleUrls: ['./car-detail-dialog.component.scss']
})
export class CarDetailDialogComponent {

  mode: string = "add";
  carDetail: CarDetail = {} as CarDetail;

  constructor(
    public dialogRef: MatDialogRef<CarDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        this.mode = data.mode;
        this.carDetail = data.element || {} as CarDetail;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.carDetail);
  }
}

