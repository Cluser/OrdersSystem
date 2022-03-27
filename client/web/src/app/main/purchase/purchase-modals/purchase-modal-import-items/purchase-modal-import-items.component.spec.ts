import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalImportItemsComponent } from './purchase-modal-import-items.component';

describe('PurchaseModalImportItemsComponent', () => {
  let component: PurchaseModalImportItemsComponent;
  let fixture: ComponentFixture<PurchaseModalImportItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalImportItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalImportItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
