import { RouterModule, Routes } from "@angular/router";
import { ClientContainerComponent } from "./client-container/client-container.component";
import { FormClientComponent } from "./form-client/form-client.component";

const myRoutes: Routes = [
  // Todo revoir les nom des id
  { path: 'advisor/:id/clients', component: ClientContainerComponent },
  { path: 'advisor/:advisorId/newClient', component: FormClientComponent },
  {
    path: 'advisor/:advisorId/updateClient/:clientId',
    component: FormClientComponent,
  },
];


export const ROUTING = RouterModule.forRoot(myRoutes);