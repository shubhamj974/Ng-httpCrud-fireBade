import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogBoxService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration = '0ms',
    exitAnimationDuration = '0ms',
    comp: any
  ): MatDialogRef<boolean> {
    return this.dialog.open(comp, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
