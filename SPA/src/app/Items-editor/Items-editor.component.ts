import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { LearningItem } from 'src/models/LearningItem';
import { ItemService } from '../item.service';
import { ADDRGETNETWORKPARAMS } from 'dns';
import { MatDialog } from '@angular/material/dialog';
import { NewItemPopupComponent } from '../new-item-popup/new-item-popup.component';

@Component({
  selector: 'app-Items-editor',
  templateUrl: './Items-editor.component.html',
  styleUrls: ['./Items-editor.component.css']
})
export class ItemsEditorComponent implements OnInit {

  Items: LearningItem[];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private contentService: ContentService, private itemService: ItemService) { }
  learningSetId: number;
  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.contentService.GetItemsForCourse(params.id.toString()).subscribe((response: LearningItem[]) => {
        this.Items = response;
      });
      this.learningSetId = params.id;
      console.log("Editor run with param:" + params.id);
    });
  }


  update(Item: LearningItem) {

    this.itemService.UpdateItem(Item).subscribe(p => {
      this.ngOnInit();
    });
  }

  remove(Item: LearningItem) {
    this.itemService.RemoveItem(Item).subscribe(p => {
      this.ngOnInit();
    });
  }

  AddNew() {
    const dialogRef = this.dialog.open(NewItemPopupComponent, {
      data: this.learningSetId
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.ngOnInit();
      }
    });
  }

}
