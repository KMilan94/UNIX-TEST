import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CarDetail } from "src/domain/car-detail";
import { CarDTO } from "src/domain/carDTO";
import { Manufacturer } from "src/domain/manufacturer";

@Component({ 
    selector: 'add-dialog',
    templateUrl: 'add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

    manufacturers: Manufacturer[] = [];
    carDetails: CarDetail[] = [];
    car: CarDTO = new CarDTO();

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        this.carDetails = data.carDetails;
        this.manufacturers = data.manufacturers;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
      this.dialogRef.close(this.car);
  }

}