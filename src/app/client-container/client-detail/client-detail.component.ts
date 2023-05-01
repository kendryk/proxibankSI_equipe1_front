import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ListClientsConseillerService } from 'src/app/services/list-clients-conseiller.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent {
  @Input() clientSelected!: Client;
  advisorId: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOninit() {
    this.advisorId = this.route.snapshot.params['id'];
  }
  goToClientAccounts(clientId: number) {
    this.advisorId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(
      `/advisor/${this.advisorId}/client/${clientId}/accounts`
    );
  }
  goToEditClient(clientId: number) {
    this.advisorId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(
      `/advisor/${this.advisorId}/updateClient/${clientId}`
    );
  }
}
