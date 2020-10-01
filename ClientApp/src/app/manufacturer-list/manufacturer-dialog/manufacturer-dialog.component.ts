import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manufacturer-dialog',
  templateUrl: './manufacturer-dialog.component.html',
  styleUrls: ['./manufacturer-dialog.component.scss']
})
export class ManufacturerDialogComponent {

  mode: string = "add";
  name: string = "";

  constructor(
    public dialogRef: MatDialogRef<ManufacturerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
        this.mode = data.mode;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.name);
  }
}

