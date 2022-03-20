import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PurchaseModalEditOfferComponent } from './purchaset-modal-edit-offer.component';

describe('PurchaseModalEditOfferComponent', () => {
  let component: PurchaseModalEditOfferComponent;
  let fixture: ComponentFixture<PurchaseModalEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ PurchaseModalEditOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
