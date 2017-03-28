import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { BookmarksModule } from './bookmarks/bookmarks.module';
import { NewBookmarkModule } from './new-bookmark/new-bookmark.module';
import { TagsModule } from './tags/tags.module';

import { AppComponent }    from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    BookmarksModule,
    NewBookmarkModule,
    TagsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
