import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from './../models/Bookmark';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {

 @Input() bookmark: Bookmark;

  constructor() { }

  ngOnInit() {
    
  }

}
