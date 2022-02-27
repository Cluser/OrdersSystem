import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalAddUserComponent } from './admin-modal-add-user.component';

describe('AdminModalAddUserComponent', () => {
  let component: AdminModalAddUserComponent;
  let fixture: ComponentFixture<AdminModalAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
