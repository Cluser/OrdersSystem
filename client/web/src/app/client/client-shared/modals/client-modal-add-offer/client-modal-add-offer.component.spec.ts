import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalAddOfferComponent } from './client-modal-add-offer.component';

describe('ClientModalAddOfferComponent', () => {
  let component: ClientModalAddOfferComponent;
  let fixture: ComponentFixture<ClientModalAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalAddOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
