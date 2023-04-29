import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-row',
  templateUrl: './client-row.component.html',
  styleUrls: ['./client-row.component.css'],
})
export class ClientRowComponent {
  @Input() oneClient!: Client;
  @Output() clientToList = new EventEmitter();

  ngOnInit() {
    console.log(this.oneClient);
  }
  sendClientToList() {
    this.clientToList.emit(this.oneClient);
  }
}
