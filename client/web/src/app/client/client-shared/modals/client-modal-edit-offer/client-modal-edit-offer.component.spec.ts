import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalEditOfferComponent } from './client-modal-edit-offer.component';

describe('ClientModalEditOfferComponent', () => {
  let component: ClientModalEditOfferComponent;
  let fixture: ComponentFixture<ClientModalEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalEditOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
