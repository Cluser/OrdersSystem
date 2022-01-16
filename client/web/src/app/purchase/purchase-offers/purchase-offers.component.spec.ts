import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOffersComponent } from './purchase-offers.component';

describe('PurchaseOffersComponent', () => {
  let component: PurchaseOffersComponent;
  let fixture: ComponentFixture<PurchaseOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
