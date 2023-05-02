import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-simulation',
  templateUrl: './client-simulation.component.html',
  styleUrls: ['./client-simulation.component.css'],
})
export class ClientSimulationComponent {
  amount: number;
  rate: number;
  duration: number;
  monthlyPayment: number;
  amountBeforeReset: number;
  rateBeforeReset: number;
  durationBeforeReset: number;
  monthlyPaymentBeforeReset: number;
  simulations: {
    amount: number;
    rate: number;
    duration: number;
    monthlyPayment: number;
  }[] = [];

  @ViewChild('creditForm') creditForm: NgForm;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['amount'] &&
      changes['amount'].previousValue != changes['amount'].currentValue
    ) {
      this.amountBeforeReset = changes['amount'].previousValue;
    }
    if (
      changes['rate'] &&
      changes['rate'].previousValue != changes['rate'].currentValue
    ) {
      this.rateBeforeReset = changes['rate'].previousValue;
    }
    if (
      changes['duration'] &&
      changes['duration'].previousValue != changes['duration'].currentValue
    ) {
      this.durationBeforeReset = changes['creditAmount'].previousValue;
    }
  }
  calculMensualite(): void {
    const periodicRate = this.rate / 100 / 12;
    const monthlyPaymentnb = this.duration * 12;
    const coefficient =
      periodicRate / (1 - Math.pow(1 + periodicRate, -monthlyPaymentnb));
    this.monthlyPayment = coefficient * this.amount;
    // pour remettre le simulateur à 0

    this.simulations.push({
      amount: this.amount,
      rate: this.rate,
      duration: this.duration,
      monthlyPayment: this.monthlyPayment,
    });

    // Stocker les valeurs précédentes avant de remettre le formulaire à 0
    this.amountBeforeReset = this.amount;
    this.rateBeforeReset = this.rate;
    this.durationBeforeReset = this.duration;
    this.monthlyPaymentBeforeReset = this.monthlyPayment;

    this.creditForm.reset();
  }
}
