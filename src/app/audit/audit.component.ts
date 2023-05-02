import { Component } from '@angular/core';
import { AuditService } from '../services/audit.service';
import { Account } from '../models/Account';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css'],
})
export class AuditComponent {
  audit: Account[] = [];

  constructor(private auditService: AuditService, private clientService: ClientService) {}

  ngOnInit() {
    this.auditService.getAudit().subscribe({
      next: (result: Account[]) => {
        this.audit = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
