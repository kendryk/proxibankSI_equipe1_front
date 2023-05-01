import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/Account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(private http: HttpClient) {}

  link = 'http://localhost:8080/accounts';

  getAudit(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.link}/audit`);
  }
}
