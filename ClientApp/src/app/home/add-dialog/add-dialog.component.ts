import { Component, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EventEmitter } from "events";
import { Car } from "src/domain/car";
import { CarDetail } from "src/domain/car-detail";
import { CarDTO } from "src/domain/carDTO";
import { Manufacturer } from "src/domain/manufacturer";

export type Mode = "add" | "edit" | "delete";

@Component({ 
    selector: 'add-dialog',
    templateUrl: 'add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

    manufacturers: Manufacturer[] = [];
    carDetails: CarDetail[] = [];
    car: CarDTO = new CarDTO();
    mode: Mode = "add";

    modifyElement: Car = {} as Car;


  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        this.carDetails = data.carDetails;
        this.manufacturers = data.manufacturers;
        this.mode = data.mode;
        this.modifyElement = data.element;

        console.log("mode: " + this.mode);
        console.log("element to modify: " + JSON.stringify(this.modifyElement))
  }

  ngOnInit() {
    if(this.mode == 'edit' && this.modifyElement) {
      this.car.carDetailID = this.modifyElement.carDetail.id;
      this.car.manufacturerID = this.modifyElement.manufacturer.id;
      this.car.id = this.modifyElement.id;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
      this.dialogRef.close(this.car);
  }

  delete(sure: boolean): void {
    this.dialogRef.close(sure);
  }

}