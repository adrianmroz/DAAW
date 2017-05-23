import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';

@Injectable
export class UserService {

  public user$ = new BehaviorSubject<any>({});

  public loginUser(name, pass) {
    //...
    this.user$.next({name: name, pass: pass});
  }
}