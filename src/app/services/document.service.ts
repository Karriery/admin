import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
});

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl = 'http://31.207.37.178:3000/document/';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.baseUrl, { headers });
  }

  getArchived() {
    return this.http.get(this.baseUrl + 'archived', { headers });
  }

  post(document: any) {
    return this.http.post(this.baseUrl, document, { headers });
  }

  patch(id: any, document: any) {
    return this.http.patch(this.baseUrl + id, document, { headers });
  }
  getById(id: string) {
    return this.http.get(this.baseUrl + id, { headers });
  }
  deleteById(id: string) {
    return this.http.patch(this.baseUrl + id, { archived: true }, { headers });
  }
}
