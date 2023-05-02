import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { Advisor } from '../models/Advisor';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  link = 'http://localhost:8080/accounts';

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.link}`);
  }

  
}
