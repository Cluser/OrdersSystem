import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalAddOfferComponent } from './client-modal-add-offer.component';

describe('PurchaseModalAddOfferComponent', () => {
  let component: PurchaseModalAddOfferComponent;
  let fixture: ComponentFixture<PurchaseModalAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalAddOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
