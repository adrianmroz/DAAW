import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { BookmarkComponent }  from './../bookmark/bookmark.component';
import { BookmarksComponent } from './bookmarks.component';

import { BookmarksService } from './../services/bookmarks.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BookmarksService
  ],
  declarations: [
    BookmarksComponent, 
    BookmarkComponent
  ],
  exports: [ 
    BookmarksComponent
     ]
})
export class BookmarksModule { }
