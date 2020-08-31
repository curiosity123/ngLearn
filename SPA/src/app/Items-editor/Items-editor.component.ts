import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { LearningItem } from 'src/models/LearningItem';
import { ItemService } from '../item.service';
import { ADDRGETNETWORKPARAMS } from 'dns';
import { MatDialog } from '@angular/material/dialog';
import { NewItemPopupComponent } from '../new-item-popup/new-item-popup.component';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/models/Pagination';

@Component({
  selector: 'app-Items-editor',
  templateUrl: './Items-editor.component.html',
  styleUrls: ['./Items-editor.component.css']
})
export class ItemsEditorComponent implements OnInit {

  Items: LearningItem[];


  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  pageIndex = 0;
  pageEvent: PageEvent;


  constructor(private route: ActivatedRoute, public dialog: MatDialog, private contentService: ContentService, private itemService: ItemService) {


  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }


  learningSetId: number;
  pagination: Pagination;

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      console.log("init");
      this.pagination =
      {
        length: 0,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        items: this.Items
      };
      console.log("init2");
      this.contentService.GetItemsForCourse(params.id.toString(), this.pagination).subscribe((response: Pagination) => {
        console.log(response);
        this.Items = response.items;
        this.length = response.length;
        this.pageSize = response.pageSize;
        this.pageIndex = response.pageIndex;
      });
      this.learningSetId = params.id;
      console.log("Editor run with param:" + params.id);
    });
  }

  pageChanged(ev: PageEvent) {
    this.pageIndex = ev.pageIndex;
    this.ngOnInit();
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
