import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { last, Observable, tap, throwError } from "rxjs";
import { AuthRequestDTO } from '../interfaces/authRequestDTO';
import { Jwt } from '../interfaces/jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private registerUrl = 'http://localhost:8080/auth/register';
  private refreshTokenUrl = 'http://localhost:8080/auth/refreshToken';

  private loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    //const authRequestDTO: AuthRequestDTO = {username, password};
    //return this.http.post<AuthRequestDTO>(this.loginUrl, authRequestDTO);
    return this.http.post<Jwt>(`${this.loginUrl}`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.accesToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('username', username);
        this.loggedIn = true;
      })
    );      
  }

  logout() {
    //return this.http.post(`${this.logoutUrl}`, username);
    const refreshToken = localStorage.getItem('refreshToken');
    this.http.post(`${this.logoutUrl}`, {token: refreshToken}).subscribe({
      next: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.loggedIn = false;
        this.router.navigate(['/login']);
      }
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  register(username: string, firstName: string, lastName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.registerUrl}`, { username, firstName, lastName, password });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return throwError(() => new Error('No refresh token found'));
    }

    const body = {
      refreshToken: refreshToken,
      expiredAccessToken: localStorage.getItem('token')
    };

    return this.http.post<any>(`${this.refreshTokenUrl}`, body).pipe(
      tap(response => {
        if (response && response.tokens) {
          localStorage.setItem('token', response.tokens.accessToken);
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
        }
      })
    );
  }
}
