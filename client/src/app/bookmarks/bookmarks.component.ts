import { Component, OnInit } from '@angular/core';
import { Bookmark } from './../models/Bookmark';
import { BookmarksService } from './../services/bookmarks.service';

import { db } from './../shared/globalVariables';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html'
})

export class BookmarksComponent implements OnInit {

  bookmarks: Array<Bookmark> = [];
  constructor(bookmarksService: BookmarksService) {

    bookmarksService.bookmarks$.subscribe(bookmarks => {
      this.bookmarks = bookmarks;
    });
    //this.bookmarks = [
    //  {
    //    id: '1',
    //    url: 'http://www.onet.pl',
    //    name: 'Onet',
    //    tags: ['news']
    //  },
    //  {
    //    id: '2',
    //    url: 'http://www.sport.pl',
    //    name: 'Sport',
    //    tags: ['sport']
    //  },
    //  {
    //    id: '3',
    //    url: 'http://www.facebook.com',
    //    name: 'Facebook',
    //    tags: ['social']
    //  }
    //];
  }

  ngOnInit() {
    this.bookmarksService.getBookmarks().subscribe(
      (data) => data.forEach(el => {
        let bookmark: Bookmark;
        bookmark = {
          id: el.id,
          url: el.url,
          name: el.name,
          tags: el.tags
        };
        this.bookmarks.push(bookmark);
      }));
      db.info().then(function (info) {
      console.log(info);
      })

  }

}
