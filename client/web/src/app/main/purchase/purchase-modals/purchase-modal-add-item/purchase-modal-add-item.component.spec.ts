import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalAddItemComponent } from './purchase-modal-add-item.component';

describe('PurchaseModalAddItemComponent', () => {
  let component: PurchaseModalAddItemComponent;
  let fixture: ComponentFixture<PurchaseModalAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalAddItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
