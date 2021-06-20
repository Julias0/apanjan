import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { }

  signIn(email: string, password: string): Observable<{ access_token: string }> {
    return this.apiService.post<{ access_token: string }, {email: string, password: string}>('/sign_in', {
      email,
      password
    }).pipe(
      tap(res => {
        localStorage.setItem('authToken', res.access_token);
      })
    );
  }

  signUp(name:string ,email: string, password: string): Observable<{ token: string }> {
    return this.apiService.post<{ token: string }, {name: string, email: string, password: string}>('/sign_up', {
      name,
      email,
      password
    });
  }
}
