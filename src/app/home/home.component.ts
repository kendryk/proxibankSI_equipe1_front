import { Component } from '@angular/core';
import { Advisor } from '../models/Advisor';
import { ActivatedRoute } from '@angular/router';
import { AdvisorService } from '../services/advisor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  advisorId: string | undefined;
  advisor: Advisor | undefined;
  advisorSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private advisorService: AdvisorService
  ) {}

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

   ngOnDestroy() {
    this.advisorSubscription.unsubscribe();
  }
}
