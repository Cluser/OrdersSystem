import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalEditOrderComponent } from './client-modal-edit-order.component';

describe('PurchaseModalEditOfferComponent', () => {
  let component: PurchaseModalEditOrderComponent;
  let fixture: ComponentFixture<PurchaseModalEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalEditOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
