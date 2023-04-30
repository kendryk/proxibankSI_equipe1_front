import { Component } from '@angular/core';
import { Client } from '../models/Client';
import { ActivatedRoute, Router } from '@angular/router';
import { Advisor } from '../models/Advisor';
import { AdvisorService } from '../services/advisor.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-client-container',
  templateUrl: './client-container.component.html',
  styleUrls: ['./client-container.component.css'],
})
export class ClientContainerComponent {
  advisorId: string | undefined;
  selectedClient!: Client;
  advisor: Advisor | undefined;
  advisorSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private advisorService: AdvisorService
  ) {}

  getSelectedClient(client: Client) {
    this.selectedClient = client;
  }

  ngOnInit() {
    this.advisorId = this.route.snapshot.params['id'];
    this.advisorSubscription = this.advisorService
      .getAdvisorById(this.advisorId)
      .subscribe({
        next: (result: Advisor) => {
          this.advisor = result;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  goToNewClient() {
    this.router.navigateByUrl(`/advisor/${this.advisorId}/newClient`);
  }

  ngOnDestroy() {
    this.advisorSubscription.unsubscribe();
  }
}
