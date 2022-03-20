import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseModalEditOrderComponent } from './purchase-modal-edit-order.component';

describe('PurchaseModalEditOrderComponent', () => {
  let component: PurchaseModalEditOrderComponent;
  let fixture: ComponentFixture<PurchaseModalEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ PurchaseModalEditOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
