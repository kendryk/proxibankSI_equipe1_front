import { Component, EventEmitter, Output } from '@angular/core';
import { ListClientsConseillerService } from 'src/app/services/list-clients-conseiller.service';
import { Client } from 'src/app/models/Client';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  @Output() clientToContainer = new EventEmitter();
  allClients: Client[] = [];
  subscription: Subscription;

  constructor(
    private serviceListClient: ListClientsConseillerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const advisorId = this.route.snapshot.params['id']; // Récupère l'ID de l'URL
    this.subscription = this.serviceListClient
      .getListClientByAdvisorId(advisorId)
      .subscribe({
        next: (result: Client[]) => {
          this.allClients = result.sort((a, b) => a.name.localeCompare(b.name));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  sendClientToContainer(client: Client) {
    this.clientToContainer.emit(client);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

