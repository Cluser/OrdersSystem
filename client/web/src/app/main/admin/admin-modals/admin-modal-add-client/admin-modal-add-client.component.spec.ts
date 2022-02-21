import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalAddClientComponent } from './admin-modal-add-client.component';

describe('AdminModalAddClientComponent', () => {
  let component: AdminModalAddClientComponent;
  let fixture: ComponentFixture<AdminModalAddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalAddClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
