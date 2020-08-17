import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { LearningItem } from 'src/models/LearningItem';

@Component({
  selector: 'app-Items-editor',
  templateUrl: './Items-editor.component.html',
  styleUrls: ['./Items-editor.component.css']
})
export class ItemsEditorComponent implements OnInit {

Items: LearningItem[];

  constructor( private route: ActivatedRoute, private contentService: ContentService) { }

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.contentService.GetItemsForCourse(params.id.toString()).subscribe((response: LearningItem[]) => {
        this.Items = response;
       
      });

      console.log("Editor run with param:" + params.id);
    });
  }


  update(Item: LearningItem)
  {

  }

  remove(Item:LearningItem)
  {

  }

}
