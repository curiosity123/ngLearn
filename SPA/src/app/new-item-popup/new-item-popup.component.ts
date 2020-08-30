import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LearningItem } from 'src/models/LearningItem';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-new-item-popup',
  templateUrl: './new-item-popup.component.html',
  styleUrls: ['./new-item-popup.component.css']
})
export class NewItemPopupComponent implements OnInit {

  dialog: MatDialogRef<NewItemPopupComponent>;
  item: LearningItem;
  setId: number;
  constructor(dialogRef: MatDialogRef<NewItemPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: number, private itemService: ItemService) {
    this.dialog = dialogRef;
    this.setId = data;
  }

  ngOnInit() {
    this.item = {
      sentenceWithGaps: "Tom p_ football every day.",
      id: 0,
      correctSentence: "Tom plays football every day.",
      item: "Plays",
      description: "play but in correct tense"
    };
  }

  Save() {
    console.log(this.setId);
    this.itemService.AddNewItem(this.item, this.setId).subscribe(result => {
      this.dialog.close();
    });

  }
  Abort() {

    this.dialog.close();
  }

}
