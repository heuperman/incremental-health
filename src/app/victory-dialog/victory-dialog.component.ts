import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-victory-dialog',
  templateUrl: './victory-dialog.component.html',
  styleUrls: ['./victory-dialog.component.css']
})
export class VictoryDialogComponent {

  constructor(public dialogRef: MatDialogRef<VictoryDialogComponent>) { }

  closeDialog(reset: boolean) {
    this.dialogRef.close(reset);
  }
}
