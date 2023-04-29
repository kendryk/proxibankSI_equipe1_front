import { Component } from '@angular/core';
import { Client } from '../models/Client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.css'],
})
export class ClientContainerComponent {
  advisorId: string | undefined;
  selectedClient!: Client;
 
  constructor(private route: ActivatedRoute, private router: Router) {}

  getSelectedClient(client: Client) {
    this.selectedClient = client;
  }

  ngOnInit() {
    this.advisorId = this.route.snapshot.params['id'];
  }

  goToNewClient() {
    this.router.navigateByUrl(`/advisor/${this.advisorId}/newClient`);
  }
}
