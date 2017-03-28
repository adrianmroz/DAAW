import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { NewBookmarkComponent } from './new-bookmark.component';
import { FormsModule }          from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NewBookmarkComponent
  ],
  exports:[
    NewBookmarkComponent
  ]
})
export class NewBookmarkModule { }
