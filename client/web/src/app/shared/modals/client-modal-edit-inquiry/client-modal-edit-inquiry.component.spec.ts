import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalEditInquiryComponent } from './client-modal-edit-inquiry.component';

describe('PurchaseModalEditInquiryComponent', () => {
  let component: PurchaseModalEditInquiryComponent;
  let fixture: ComponentFixture<PurchaseModalEditInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalEditInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalEditInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
