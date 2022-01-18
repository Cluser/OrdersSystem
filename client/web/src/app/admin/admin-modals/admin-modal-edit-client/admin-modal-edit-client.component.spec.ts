import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalEditClientComponent } from './admin-modal-edit-client.component';

describe('AdminModalEditClientComponent', () => {
  let component: AdminModalEditClientComponent;
  let fixture: ComponentFixture<AdminModalEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalEditClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
