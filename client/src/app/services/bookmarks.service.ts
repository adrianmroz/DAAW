import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { apiAdress } from './../shared/globalVariables';
import { Bookmark } from './../models/Bookmark';


@Injectable()
export class BookmarksService {
  
  constructor(private _http: Http) { }

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
      .catch(this.handleError);
  }
 
  private handleError(error: Response) {
    console.error('Bookmarks Service Error:', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}