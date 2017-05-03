import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { BookmarksModule } from './bookmarks/bookmarks.module';
import { NewBookmarkModule } from './new-bookmark/new-bookmark.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { routing } from './routing';

import { AppComponent }    from './app.component';
import { AuthComponent } from './auth/auth.component';

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
    TagsModule,
    AuthModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
