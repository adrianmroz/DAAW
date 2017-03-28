import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsComponent } from './tags.component';

import { TagsService } from './../services/tags.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TagsService
  ],
  declarations: [
    TagsComponent
  ]
})
export class TagsModule { }
