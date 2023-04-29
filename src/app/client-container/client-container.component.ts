import { Component } from '@angular/core';
import { Client } from '../models/Client';

@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.css'],
})
export class ClientContainerComponent {
  selectedClient!: Client;
  constructor() {}

  getSelectedClient(client: Client) {
    this.selectedClient = client;
  }
}
