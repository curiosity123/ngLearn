import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/models/Item';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-new-item-popup',
  templateUrl: './new-item-popup.component.html',
  styleUrls: ['./new-item-popup.component.css']
})
export class NewItemPopupComponent implements OnInit {

  dialog: MatDialogRef<NewItemPopupComponent>;
  item: Item;
  setId: number;
  constructor(dialogRef: MatDialogRef<NewItemPopupComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: number,
              private contentService: ContentService) {
    this.dialog = dialogRef;
    this.setId = data;
  }

  ngOnInit() {
    this.item = {
      sentenceWithGaps: 'Tom p_ football every day.',
      id: 0,
      correctSentence: 'Tom plays football every day.',
      item: 'Plays',
      description: 'play but in correct tense'
    };
  }

  Save() {
    console.log(this.setId);
    this.contentService.AddNewItem(this.item, this.setId).subscribe(result => {
      this.dialog.close();
    });

  }
  Abort() {

    this.dialog.close();
  }

}
