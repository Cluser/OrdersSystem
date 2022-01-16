import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalEditItemComponent } from './client-modal-edit-item.component';

describe('PurchaseModalEditItemComponent', () => {
  let component: PurchaseModalEditItemComponent;
  let fixture: ComponentFixture<PurchaseModalEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalEditItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
