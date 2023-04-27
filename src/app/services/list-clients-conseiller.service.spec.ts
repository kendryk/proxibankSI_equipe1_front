import { TestBed } from '@angular/core/testing';

import { ListClientsConseillerService } from './list-clients-conseiller.service';

describe('ListClientsConseillerService', () => {
  let service: ListClientsConseillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListClientsConseillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
