import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalArchiveComponent } from './purchase-modal-archive.component';

describe('PurchaseModalArchiveComponent', () => {
  let component: PurchaseModalArchiveComponent;
  let fixture: ComponentFixture<PurchaseModalArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseModalArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
