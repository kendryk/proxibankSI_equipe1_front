import { Component } from '@angular/core';
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
  advisorId: string;
  clientId!: string;
  accounts: Account[];
  selectedClient: Client;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listClientsConseillerService: ListClientsConseillerService
  ) {}

  ngOnInit() {
    const advisorId = this.route.snapshot.params['id'];
    const clientId = this.route.snapshot.params['clientId'];

    this.subscription = this.listClientsConseillerService
      .getAccountList(this.advisorId, this.clientId, 'accounts')
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }
}
