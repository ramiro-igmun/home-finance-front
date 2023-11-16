import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent {
  category: string = '';
  constructor(public dialogRef: MatDialogRef<AddCategoryModalComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
