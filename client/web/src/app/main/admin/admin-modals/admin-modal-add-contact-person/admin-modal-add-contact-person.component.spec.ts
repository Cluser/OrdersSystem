import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalAddContactPersonComponent } from './admin-modal-add-contact-person.component';

describe('AdminModalAddContactPersonComponent', () => {
  let component: AdminModalAddContactPersonComponent;
  let fixture: ComponentFixture<AdminModalAddContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalAddContactPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalAddContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
