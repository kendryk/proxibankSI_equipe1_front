import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ClientContainerComponent } from './client-container/client-container.component';
import { ClientListComponent } from './client-container/client-list/client-list.component';
import { ClientDetailComponent } from './client-container/client-detail/client-detail.component';
import { ROUTING } from './app.routing';
import { ClientRowComponent } from './client-container/client-list/client-row/client-row.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountStatusTranslationPipe } from './pipes/account-status-translation.pipe';
import { FormClientComponent } from './form-client/form-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ClientAccountsComponent } from './client-accounts/client-accounts.component';
import { NoFoundComponent } from './no-found/no-found.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ClientContainerComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientRowComponent,
    AccountStatusTranslationPipe,
    FormClientComponent,
    HomeComponent,
    ClientAccountsComponent,
    NoFoundComponent,
 

  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule, 
    ROUTING, 
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
