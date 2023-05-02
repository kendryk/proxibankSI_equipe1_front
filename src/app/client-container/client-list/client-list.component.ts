import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  @Output() clientToContainer = new EventEmitter();
  @Input() clientToDeleted!: Client;
  allClients: Client[] = [];
  subscription: Subscription;

  constructor(
    // private serviceListClient: ListClientsConseillerService,
    private serviceClient: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const advisorId = this.route.snapshot.params['id']; // Récupère l'ID de l'URL

    this.serviceClient.getClients(advisorId).subscribe({
      next: (result: Client[]) => {
        this.allClients = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientToDeleted'] && changes['clientToDeleted'].currentValue) {
      this.deleteClientFromDetail(changes['clientToDeleted'].currentValue);
    }
  }

  sendClientToContainer(client: Client) {
    this.clientToContainer.emit(client);
  }

  deleteClientFromDetail(client: Client) {
    const index = this.allClients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      this.allClients.splice(index, 1);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
