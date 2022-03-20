import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IItem } from 'src/app/shared/models';

import { PurchaseModalEditInquiryComponent } from './purchase-modal-edit-inquiry.component';

describe('PurchaseModalEditInquiryComponent', () => {
  let component: PurchaseModalEditInquiryComponent;
  let fixture: ComponentFixture<PurchaseModalEditInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ PurchaseModalEditInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalEditInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {

  //   expect(true).toBeTruthy();
  // });
});
