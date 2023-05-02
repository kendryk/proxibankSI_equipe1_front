import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSimulationComponent } from './client-simulation.component';

describe('ClientSimulationComponent', () => {
  let component: ClientSimulationComponent;
  let fixture: ComponentFixture<ClientSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
