import { Component } from '@angular/core';
import { ListClientsConseillerService } from '../services/list-clients-conseiller.service';
import { Client } from '../models/Client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.css'],
})
export class ClientContainerComponent {
  
  allClients!: Client[];
  constructor(
    private serviceListClient: ListClientsConseillerService,
    private route: ActivatedRoute
    ){};


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