import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { Observable, map, of, tap } from 'rxjs';
import { ListClientsConseillerService } from './list-clients-conseiller.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private allClients: Observable<Client[]>;

  constructor(private serviceListClient: ListClientsConseillerService) {}

  /**
   * Renvoie l'observable allClients, appelant getAllClientsByAdvisorId pour le remplir s'il est vide.
   * @param advisorId Identifiant de l'advisor pour lequel récupérer les clients.
   * @returns Observable d'un tableau de clients trié par ordre alphabétique.
   */
  getClients(advisorId: string): Observable<Client[]> {
    if (!this.allClients) {
      // allClients est vide, donc on appelle getAllClientsByAdvisorId pour le remplir.
      this.allClients = this.getAllClientsByAdvisorId(advisorId);
    }
    return this.allClients;
  }

  /**
   * Récupère tous les clients d'un advisor spécifique à partir du service "serviceListClient".
   * Trie les clients par ordre alphabétique de leur nom avant de les renvoyer.
   * @param advisorId Identifiant de l'advisor pour lequel récupérer les clients.
   * @returns Observable d'un tableau de clients trié par ordre alphabétique.
   */
  getAllClientsByAdvisorId(advisorId: string): Observable<Client[]> {
    // Appelle la méthode pour récupérer tous les clients d'un advisor par ID et stocke l'Observable retourné dans "allClients".
    this.allClients = this.serviceListClient
      .getListClientByAdvisorId(advisorId)
      // Applique une transformation sur les résultats pour trier les clients par ordre alphabétique de leur nom.
      .pipe(
        map((result: Client[]) =>
          result.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
    // Renvoie l'Observable "allClients".
    return this.allClients;
  }

  /**
   * Supprime un client spécifique à partir de la liste de tous les clients.
   * @param advisorId Identifiant de l'advisor qui possède le client.
   * @param clientId Identifiant du client à supprimer.
   */
  deleteClientById(advisorId: string, clientId: string): Observable<Client> {
    // Appelle la méthode pour supprimer un client spécifique par l'ID
    return this.serviceListClient.deleteClientByID(advisorId, clientId).pipe(
      tap(() => {
        // Une fois le client supprimé avec succès, met à jour le tableau `this.allClients`
        this.allClients = this.getAllClientsByAdvisorId(advisorId);
      })
    );
  }
}
