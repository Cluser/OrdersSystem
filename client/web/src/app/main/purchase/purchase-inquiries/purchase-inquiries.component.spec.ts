import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiriesComponent } from './purchase-inquiries.component';

describe('PurchaseInquiriesComponent', () => {
  let component: PurchaseInquiriesComponent;
  let fixture: ComponentFixture<PurchaseInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
