import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookmarksService } from './../services/bookmarks.service';

@Component({
  selector: 'app-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.less']
})
export class NewBookmarkComponent implements OnInit {

  active: Boolean = false;

  constructor(private bookmarksService: BookmarksService) { }

  ngOnInit() {
  }
  onClick(){
    this.active ? this.active = false : this.active = true;
  }
  addBookmark(form: NgForm){
    this.bookmarksService.addBookmark(form.value).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }
}