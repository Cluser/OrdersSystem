import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseItemsSearchComponent } from './purchase-items-search.component';

describe('PurchaseItemsSearchComponent', () => {
  let component: PurchaseItemsSearchComponent;
  let fixture: ComponentFixture<PurchaseItemsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseItemsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseItemsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
