import { Injectable } from '@angular/core';
import { UserInfoDTO } from '../interfaces/userInfoDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private userUrl = 'http://localhost:8080/korisnik/by-token';

  constructor(private http: HttpClient) { }

  getUserFromToken(): Observable<UserInfoDTO> {
    const token = this.getAccessToken();
    if (!token) {
      return throwError(() => new Error('No access token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserInfoDTO>(this.userUrl, { headers });
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

}
