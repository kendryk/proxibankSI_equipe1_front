import { RouterModule, Routes } from '@angular/router';
import { ClientContainerComponent } from './client-container/client-container.component';
import { FormClientComponent } from './form-client/form-client.component';
import { HomeComponent } from './home/home.component';
import { ClientAccountsComponent } from './client-accounts/client-accounts.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { AuditComponent } from './audit/audit.component';
import { VirementComponent } from './virement/virement.component';

const myRoutes: Routes = [
  // Todo revoir les nom des id
  { path: 'advisor/:id', component: HomeComponent },
  { path: 'advisor/:id/clients', component: ClientContainerComponent },
  { path: 'advisor/:advisorId/newClient', component: FormClientComponent },
  {
    path: 'advisor/:advisorId/clients/:clientId/accounts',
    component: ClientAccountsComponent,
  },
  {
    path: 'advisor/:advisorId/virement',
    component: VirementComponent,
  },
  {
    path: 'advisor/:advisorId/virement/clients/:clientId',
    component: VirementComponent,
  },
  {
    path: 'advisor/:advisorId/updateClient/:clientId',
    component: FormClientComponent,
  },
  {
    path: 'audit',
    component: AuditComponent,
  },
  { path: 'not-found', component: NoFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

export const ROUTING = RouterModule.forRoot(myRoutes);
