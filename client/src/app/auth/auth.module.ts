import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { AuthComponent }  from './auth.component';

import { AuthService }    from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
