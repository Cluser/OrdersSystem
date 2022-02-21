import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOffersSearchComponent } from './purchase-offers-search.component';

describe('PurchaseOffersSearchComponent', () => {
  let component: PurchaseOffersSearchComponent;
  let fixture: ComponentFixture<PurchaseOffersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOffersSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOffersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
