import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-Items-editor',
  templateUrl: './Items-editor.component.html',
  styleUrls: ['./Items-editor.component.css']
})
export class ItemsEditorComponent implements OnInit {

  constructor( private route: ActivatedRoute, private contentService: ContentService) { }

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      console.log("Editor run with param:" + params.id);
    });
  }

}
