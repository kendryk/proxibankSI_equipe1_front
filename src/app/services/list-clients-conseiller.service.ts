import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListClientsConseillerService {
  constructor(private http: HttpClient) {}

  link = 'http://localhost:8080/advisors';

  getListClientByAdvisorId(id: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.link}/${id}/listClients`);
  }

  getClientByIdByAdvisorId(
    clientId: string,
    advisorId: string
  ): Observable<Client> {
    return this.http
      .get<Client[]>(`${this.link}/${advisorId}/listClients`)
      .pipe(
        map((clients: Client[]) =>
          clients.find((c: Client) => c.id === Number(clientId))
        )
      );
  }

  addClientByAdvisorId(id: string, newClient: Client): Observable<Client> {
    return this.http.post<Client>(`${this.link}/${id}/addClient`, newClient);
  }

  updateClientOfAdvisorById(
    advisorId: string,
    newClient: Client,
    clientId: string
  ): Observable<Client> {
    return this.http.put<Client>(
      `${this.link}/${advisorId}/updateClient/${clientId}`,
      newClient
    );
  }
}
