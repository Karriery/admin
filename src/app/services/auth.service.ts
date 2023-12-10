import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
});
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://31.207.37.178:3000';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/auth/admin/login`;
    return this.http.post(url, credentials, { headers });
  }
}
