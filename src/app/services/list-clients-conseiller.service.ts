import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListClientsConseillerService {
 
  constructor(private http: HttpClient) {}

  link = 'http://localhost:8080/advisors';

  getListClientByAdvisorId(id: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.link}/${id}/listClient`);
  }
}
