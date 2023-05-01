import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent {
  @Input() clientSelected!: Client;
  @Output() clientDeleted = new EventEmitter<Client>();
  advisorId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceClient: ClientService
  ) {}

  ngOnInit() {
    this.advisorId = this.route.snapshot.params['id'];
    console.log(this.advisorId);
  }
  goToClientAccounts(clientId: number) {
    this.advisorId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(
      `/advisor/${this.advisorId}/client/${clientId}/accounts`
    );
  }
  goToEditClient(clientId: number) {
    this.router.navigateByUrl(
      `/advisor/${this.advisorId}/updateClient/${clientId}`
    );
  }

  deleteClientByID(clientId: number) {
    if (confirm('Êtes-vous sûr de supprimer ce clients ?')) {
      // Si l'utilisateur clique sur "OK", exécutez la méthode de suppression
      this.serviceClient
        .deleteClientById(this.advisorId, String(clientId))
        .subscribe({
          next: (client) => {
            alert(
              `Le client ${client.name}a été effacé de la base de données ?`
            );
            this.clientDeleted.emit(client);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
