import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalEditItemComponent } from './client-modal-edit-item.component';

describe('ClientModalEditItemComponent', () => {
  let component: ClientModalEditItemComponent;
  let fixture: ComponentFixture<ClientModalEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalEditItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
