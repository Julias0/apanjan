import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  post<T, K>(url: string, body: K) {
    return this.httpClient.post<T>(environment.apiUrl + url, body);
  }

  get<T>(url: string, options: {  params?: HttpParams }) {
    return this.httpClient.get<T>(environment.apiUrl + url, options);
  }
}
