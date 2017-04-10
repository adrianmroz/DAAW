import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { NewBookmarkModule }  from '../new-bookmark/new-bookmark.module';

import { BookmarkComponent }  from './../bookmark/bookmark.component';
import { BookmarksComponent } from './bookmarks.component';

import { BookmarksService } from './../services/bookmarks.service';

@NgModule({
  imports: [
    CommonModule,
    NewBookmarkModule
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
