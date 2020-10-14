import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html'
})
export class EditDialogComponent {

  form = new FormGroup({title: new FormControl('')});

  constructor(@Inject(MAT_DIALOG_DATA) public willSpeak: boolean) {
  }

}
