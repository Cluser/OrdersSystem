import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalAddOrderComponent } from './purchase-modal-add-order.component';

describe('PurchaseModalAddOrderComponent', () => {
  let component: PurchaseModalAddOrderComponent;
  let fixture: ComponentFixture<PurchaseModalAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
