import { Component } from '@angular/core';
import { Client } from '../models/Client';
import { ActivatedRoute, Router } from '@angular/router';
import { ListClientsConseillerService } from '../services/list-clients-conseiller.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css'],
})
export class FormClientComponent {
  // Initialise des variables
  advisorId!: string;
  clientId!: string;
  clientForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private serviceListClient: ListClientsConseillerService, // Injecte le service ListClientsConseillerService
    private route: ActivatedRoute, // Injecte ActivatedRoute pour récupérer les paramètres de l'URL
    private router: Router // Injecte Router pour naviguer entre les pages
  ) {}

  // Méthode du cycle de vie Angular ngOnInit, appelée lorsque le composant est initialisé
  ngOnInit(): void {
    this.advisorId = this.route.snapshot.params['advisorId']; // Récupère l'ID de l'URL

    this.clientId = this.route.snapshot.params['clientId']; // Récupère l'ID de l'URL

    // Initialise le formulaire
    this.clientForm = new FormGroup({
      // Initialise chaque champ du formulaire avec les validateurs appropriés
      id: new FormControl(0),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
      // Modifier la validation de l'adresse pour autoriser les caractères spéciaux couramment utilisés en français tels que les accents et les apostrophes.
      // La modification consiste à ajouter les caractères "àâäéèêëïîôöùûüç'’" au pattern de validation.
      adress: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z0-9\sàâäéèêëïîôöùûüç'’-]+$/),
      ]),
      zipCode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern(/^\d+$/),
      ]),
      // vérifie que la chaîne de caractères saisie dans le champ de saisie de ville
      // correspond à un format spécifique, permettant uniquement des lettres alphabétiques 
      // (majuscules ou minuscules), avec un tiret ou un espace optionnel entre les mots et 
      // sans se terminer par un espace ou un tiret.
      city: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^([A-Za-z]+[-\s]?)+[A-Za-z]$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/),
      ]),
    });

    // je veux recuperer la liste des clients du conseiller.
    this.serviceListClient
      .getClientByIdByAdvisorId(this.clientId, this.advisorId)
      .subscribe({
        // Si la requête réussit, la réponse est stockée dans result
        next: (result: Client) => {
          // Vérifie si le client existe déjà ou non, en fonction de quoi isEditing est mis à jour
          result !== undefined ? (this.isEditing = true) : null;
          // Remplit le formulaire avec les données du client récupérées
          this.clientForm.patchValue(result);
        },
        // Si la requête échoue, affiche une erreur dans la console
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSubmit(): void {
    let newC: Client = this.clientForm.value;
    if (!this.advisorId) {
      console.error(
        "Impossible d'ajouter le client : ID du conseiller manquant"
      );
      alert("Une erreur est survenue lors de l'ajout du client");
      return;
    }
    if (!newC) {
      console.error("Impossible d'ajouter le client : données manquantes");
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (this.isEditing) {
      this.serviceListClient
        .updateClientOfAdvisorById(this.advisorId, newC, this.clientId)
        .subscribe({
          next: () => {
            alert('Le client a bien été modifier');
            this.router.navigateByUrl(`/advisor/${this.advisorId}/clients`);
          },
          error: (err) => {
            console.log(err, 'backend non connecté');
            alert(
              'Une erreur est survenue lors de la modification du client veuillez contacter votre administrateur'
            );
          },
        });
    } else {
      this.serviceListClient
        .addClientByAdvisorId(this.advisorId, newC)
        .subscribe({
          next: () => {
            alert('Le client a bien été enregistré');
            this.router.navigateByUrl(`/advisor/${this.advisorId}/clients`);
          },
          error: (err) => {
            console.log(err, 'backend non connecté');
            alert(
              "Une erreur est survenue lors de l'ajout du client veuillez contacter votre administrateur"
            );
          },
        });
    }
  }

  backToClients() {
    if (this.advisorId) {
      this.router.navigate(['/advisor', this.advisorId, 'clients']);
    }
  }

}
