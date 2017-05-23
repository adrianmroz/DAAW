import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { apiAdress } from './../shared/globalVariables';
import { Bookmark } from './../models/Bookmark';

import { UserService } from '../user/user.service';


@Injectable()
export class BookmarksService {

  public bookmarks$ = new BehaviorSubject([]);
  
  constructor(private _http: Http, user: UserService) {
    user.user$.switchMap(user =>
      this._http.get('bookmarks-url', {user: user}))
      .subscribe(bookmarks => {
        this.bookmarks$.next(bookmarks);
      });
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  
  getBookmarks(): Observable<any>{
    return this._http.get(apiAdress+'/bookmarks',this.options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  addBookmark(payload: any): Observable<any>{
    return this._http.post(apiAdress+'/bookmarks',JSON.stringify(payload), this.options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
      .subscribe(bookmarks => {
        this.bookmarks$.next(bookmarks)
      });
  }
 
  private handleError(error: Response) {
    console.error('Bookmarks Service Error:', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}