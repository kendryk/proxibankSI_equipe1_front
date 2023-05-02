import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advisor } from '../models/Advisor';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { TransfertDTO } from '../models/TransfertDTo';

@Injectable({
  providedIn: 'root',
})
export class AdvisorService {
  constructor(private http: HttpClient) {}

  link = 'http://localhost:8080/advisors';

  getAdvisorById(id: string): Observable<Advisor> {
    return this.http.get<Advisor>(`${this.link}/${id}`);
  }

  transfertAccountWithAdvisorId(
    advisorId: string,
    transfert: TransfertDTO
  ): Observable<Account[]> {
    return this.http.post<Account[]>(
      `${this.link}/${advisorId}/transferBetweenAccountsCurrent`,
      transfert
    );
  }

  transfertAccountByClientIdWithAdvisorId(
    advisorId: string,
    clientId: string,
    transfert: TransfertDTO
  ): Observable<Account[]> {
    return this.http.post<Account[]>(
      `${this.link}/${advisorId}/clients/${clientId}/accounts/transferBetweenAccounts`,
      transfert
    );
  }
}
