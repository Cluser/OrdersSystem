import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalAddOrderComponent } from './client-modal-add-order.component';

describe('ClientModalAddOrderComponent', () => {
  let component: ClientModalAddOrderComponent;
  let fixture: ComponentFixture<ClientModalAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
