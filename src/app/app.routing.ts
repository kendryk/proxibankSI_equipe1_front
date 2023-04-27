import { RouterModule, Routes } from "@angular/router";
import { ClientContainerComponent } from "./client-container/client-container.component";

const myRoutes: Routes = [
  { path: 'advisor/:id/clients', component: ClientContainerComponent },
];


export const ROUTING = RouterModule.forRoot(myRoutes);