import { Component, Input } from '@angular/core';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-row',
  templateUrl: './client-row.component.html',
  styleUrls: ['./client-row.component.css'],
})
export class ClientRowComponent {
  @Input() oneClient!: Client;


  ngOnInit() {
    console.log(this.oneClient);
  }

}
