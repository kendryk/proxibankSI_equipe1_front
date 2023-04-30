import { Component, Input } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ListClientsConseillerService } from 'src/app/services/list-clients-conseiller.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent {
  @Input() clientSelected!: Client;
  selectedClient!: Client;
  

  constructor(
    private clientService: ListClientsConseillerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const advisorId = this.route.snapshot.params['id'];
    console.log(this.clientService.getListClientByAdvisorId(advisorId));
  }
  

  recupererSelectedClient(client: Client) {
    this.selectedClient = client;
  }

}
