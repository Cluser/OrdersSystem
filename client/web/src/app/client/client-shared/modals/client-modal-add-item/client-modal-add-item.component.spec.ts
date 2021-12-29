import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalAddItemComponent } from './client-modal-add-item.component';

describe('ClientModalAddItemComponent', () => {
  let component: ClientModalAddItemComponent;
  let fixture: ComponentFixture<ClientModalAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalAddItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
