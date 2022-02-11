import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiriesSearchComponent } from './purchase-inquiries-search.component';

describe('PurchaseItemsSearchComponent', () => {
  let component: PurchaseInquiriesSearchComponent;
  let fixture: ComponentFixture<PurchaseInquiriesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInquiriesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiriesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
