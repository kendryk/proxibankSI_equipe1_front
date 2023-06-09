import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRowComponent } from './client-row.component';

describe('ClientRowComponent', () => {
  let component: ClientRowComponent;
  let fixture: ComponentFixture<ClientRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
