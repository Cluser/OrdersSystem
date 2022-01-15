import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalEditOrderComponent } from './client-modal-edit-order.component';

describe('ClientModalEditOfferComponent', () => {
  let component: ClientModalEditOrderComponent;
  let fixture: ComponentFixture<ClientModalEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalEditOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
