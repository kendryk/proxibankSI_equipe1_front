import { Component } from '@angular/core';
import { ListClientsConseillerService } from 'src/app/services/list-clients-conseiller.service';
import { Client } from 'src/app/models/Client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  allClients: Client[] = [];
  constructor(
    private serviceListClient: ListClientsConseillerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const advisorId = this.route.snapshot.params['id']; // Récupère l'ID de l'URL
    this.serviceListClient.getListClientByAdvisorId(advisorId).subscribe({
      next: (result: Client[]) => {
        this.allClients = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
//implement ondestroy