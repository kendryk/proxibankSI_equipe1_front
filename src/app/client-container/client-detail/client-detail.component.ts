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
<<<<<<< HEAD
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
=======
  advisorId: string | undefined;
  // selectedClient!: Client;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOninit() {
    this.advisorId = this.route.snapshot.params['id'];
  }
  // recupererSelectedClient(client: Client) {
  //   this.selectedClient = client;
  // }

  goToEditClient(clientId: number) {
    this.advisorId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(
      `/advisor/${this.advisorId}/updateClient/${clientId}`
    );
>>>>>>> df3b7459dcbcc443864cf093ecc52c79988cc550
  }

}
