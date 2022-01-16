import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalAddInquiryComponent } from './client-modal-add-inquiry.component';

describe('PurchaseModalAddInquiryComponent', () => {
  let component: PurchaseModalAddInquiryComponent;
  let fixture: ComponentFixture<PurchaseModalAddInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalAddInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalAddInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
