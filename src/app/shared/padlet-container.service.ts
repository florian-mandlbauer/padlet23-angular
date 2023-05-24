import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PadletContainerService {

  private apiUrl = 'http://padlet23.s1910456018.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getContainers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/padletcontainers`);
  }

  getContainerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/padletcontainers/${id}`);
  }

  createContainer(container: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/padletcontainers`, container);
  }

  updateContainer(id: number, container: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/padletcontainers/${id}`, container);
  }

  deleteContainer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/padletcontainers/${id}`);
  }

  private errorHandler(error:Error | any): Observable<any> {
    return throwError(error);
  }
}
