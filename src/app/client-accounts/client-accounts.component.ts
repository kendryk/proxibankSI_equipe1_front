import { Component, Input } from '@angular/core';
import { Account } from '../models/Account';
import { ActivatedRoute, Router } from '@angular/router';
import { ListClientsConseillerService } from '../services/list-clients-conseiller.service';
import { Subscription } from 'rxjs';
import { Client } from '../models/Client';

@Component({
  selector: 'app-client-accounts',
  templateUrl: './client-accounts.component.html',
  styleUrls: ['./client-accounts.component.css'],
})
export class ClientAccountsComponent {
  @Input() clientSelected!: Client;
  advisorId: string;
  clientId!: string;
  accounts: Account[];
  selectedClient: Client;
  subscription: Subscription;
  showSimulationComponent = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listClientsConseillerService: ListClientsConseillerService
  ) {}

  ngOnInit() {
    this.advisorId = this.route.snapshot.params['advisorId'];
    this.clientId = this.route.snapshot.params['clientId'];

    this.subscription = this.listClientsConseillerService
      .getAccountList(this.advisorId, this.clientId, 'accounts')
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });

    this.subscription = this.listClientsConseillerService
      .getClientByIdByAdvisorId(this.clientId, this.advisorId)
      .subscribe((client: Client) => {
        this.selectedClient = client;
        this.accounts = client.accountList;
      });
  }

  goToVirementClient(clientId: string) {
    this.router.navigateByUrl(
      `/advisor/${this.advisorId}/virement/clients/${clientId}`
    );
  }
}
