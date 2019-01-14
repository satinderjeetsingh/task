import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IData } from './data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public Url : string = "https://us-central1-eduwaivecommon.cloudfunctions.net/getTimeLineData";

  constructor(public _http: HttpClient){}

  getData(): Observable<IData[]>{
    return this._http.get<IData[]>(this.Url);
  }
  
}
