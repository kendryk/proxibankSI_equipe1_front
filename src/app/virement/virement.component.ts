import { Component, SimpleChanges } from '@angular/core';
import { Account } from '../models/Account';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransfertDTO } from '../models/TransfertDTo';
import { AccountService } from '../services/account.service';
import { AdvisorService } from '../services/advisor.service';
import { ListClientsConseillerService } from '../services/list-clients-conseiller.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css'],
})
export class VirementComponent {
  advisorId!: string;
  clientId!: string;
  accounts!: Account[];
  virementForm!: FormGroup;

  senderAccount: string;
  beneficiaryAccount: string;
  amount: number;

  errorMessage: boolean = false;

  constructor(
    private accountService: AccountService,
    private advisorService: AdvisorService,
    private route: ActivatedRoute, // Injecte ActivatedRoute pour récupérer les paramètres de l'URL
    private listClientsConseillerService: ListClientsConseillerService
  ) {}

  ngOnInit(): void {
    this.advisorId = this.route.snapshot.params['advisorId']; // Récupère l'ID de l'URL

    this.clientId = this.route.snapshot.params['clientId']; // Récupère l'ID de l'URL

    // on initialise le formulaire
    this.virementForm = new FormGroup({
      accountSourceId: new FormControl(null, [Validators.required]),
      accountDestinationId: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });

    if (this.clientId) {
      this.getAccountsClient();
    } else {
      this.getAllAccounts();
    }
  }

  onSubmit(): void {
    this.errorMessage = false;

    let transfert: TransfertDTO = this.virementForm.value;

    if (!this.advisorId) {
      console.error(
        "Impossible d'effectuer le transfert : ID du conseiller manquant"
      );
      alert("Une erreur est survenue lors de l'ajout du client");
      return;
    }
    if (!transfert) {
      console.error("Impossible d'effectuer le transfert : données manquantes");
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (this.clientId) {
      this.advisorService
        .transfertAccountByClientIdWithAdvisorId(
          this.advisorId,
          this.clientId,
          transfert
        )
        .subscribe({
          next: () => {
            this.senderAccount = this.getAccountNumberById(
              transfert.accountSourceId
            );
            this.beneficiaryAccount = this.getAccountNumberById(
              transfert.accountDestinationId
            );
            this.amount = transfert.amount;

            alert('Le transfert a bien été effectué');
            this.getAccountsClient();
          },
          error: (err) => {
            console.log(err, 'backend non connecté');
            this.errorMessage = true;
            alert(
              'Une erreur est survenue lors du transfert veuillez contacter votre administrateur'
            );
          },
        });
    } else {
      this.advisorService
        .transfertAccountWithAdvisorId(this.advisorId, transfert)
        .subscribe({
          next: () => {
            this.senderAccount = this.getAccountNumberById(
              transfert.accountSourceId
            );
            this.beneficiaryAccount = this.getAccountNumberById(
              transfert.accountDestinationId
            );
            this.amount = transfert.amount;

            alert('Le transfert a bien été effectué');
            this.getAllAccounts();
          },
          error: (err) => {
            console.log(err, 'backend non connecté');
            this.errorMessage = true;
            alert(
              'Une erreur est survenue lors du transfert veuillez contacter votre administrateur'
            );
          },
        });
    }
  }

  hasSavingsAccount(): boolean {
    return this.accounts.some((account) => account.accountStatus === 'saving');
  }

  getAllAccounts() {
    // je veux recuperer la liste de tout les comptes courant de la banque
    this.accountService.getAllAccounts().subscribe({
      next: (result: Account[]) => {
        this.accounts = result
          .filter((account) => account.accountStatus === 'current')
          .sort((a, b) => a.id - b.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAccountsClient() {
    this.listClientsConseillerService
      .getAccountList(this.advisorId, this.clientId, 'accounts')
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts.sort((a, b) => a.id - b.id);
      });
  }

  getAccountNumberById(accountId: number): string | null {
    const account = this.accounts.find((a) => a.id === accountId);
    return account ? account.number : null;
  }
}
