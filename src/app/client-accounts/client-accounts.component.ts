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

  constructor(
    private route: ActivatedRoute,
    private listClientsConseillerService: ListClientsConseillerService
  ) {}

  ngOnInit() {
    const advisorId = this.route.snapshot.params['advisorId'];
    const clientId = this.route.snapshot.params['clientId'];
   
    this.subscription = this.listClientsConseillerService
      .getAccountList(advisorId, clientId, 'accounts')
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        console.log(accounts);
      });

    this.subscription = this.listClientsConseillerService
      .getClientByIdByAdvisorId(clientId, advisorId)
      .subscribe((client: Client) => {
        this.selectedClient = client;
        this.accounts = client.accountList;
        console.log(client);
      });
  }
}
