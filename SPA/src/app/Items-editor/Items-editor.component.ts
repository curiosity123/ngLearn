import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ADDRGETNETWORKPARAMS } from 'dns';
import { MatDialog } from '@angular/material/dialog';
import { NewItemPopupComponent } from '../new-item-popup/new-item-popup.component';
import { PageEvent } from '@angular/material/paginator';
import { Item } from 'src/models/Item';
import { ContentService } from 'src/services/content.service';
import { Pagination } from 'src/models/Pagination';


@Component({
  selector: 'app-Items-editor',
  templateUrl: './Items-editor.component.html',
  styleUrls: ['./Items-editor.component.css']
})
export class ItemsEditorComponent implements OnInit {

  Items: Item[];


  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10];
  pageIndex = 0;
  pageEvent: PageEvent;


  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private contentService: ContentService) {
  }


  learningSetId: number;
  pagination: Pagination;

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      console.log('init');
      this.pagination = {
        length: 0,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        items: this.Items
      };
      console.log('init2');
      this.contentService.GetItemsForCourse(params.id.toString(), this.pagination).subscribe((response: Pagination) => {
        console.log(response);
        this.Items = response.items;
        this.length = response.length;
        this.pageSize = response.pageSize;
        this.pageIndex = response.pageIndex;
      });
      this.learningSetId = params.id;
      console.log('Editor run with param:' + params.id);
    });
  }

  pageChanged(ev: PageEvent) {
    this.pageIndex = ev.pageIndex;
    this.pageSize = ev.pageSize;
    this.ngOnInit();
  }

  update(item: Item) {

    this.contentService.UpdateItem(item).subscribe(p => {
      this.ngOnInit();
    });
  }

  remove(item: Item) {
    this.contentService.RemoveItem(item).subscribe(p => {
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
