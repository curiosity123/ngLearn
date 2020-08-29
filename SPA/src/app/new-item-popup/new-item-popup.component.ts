import { Component, OnInit } from '@angular/core';
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
  constructor(dialogRef: MatDialogRef<NewItemPopupComponent>, private itemService: ItemService) {
    this.dialog = dialogRef;

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
    this.itemService.AddNewItem(this.item).subscribe(result => {
      this.dialog.close();
    });

  }
  Abort() {

    this.dialog.close();
  }

}
