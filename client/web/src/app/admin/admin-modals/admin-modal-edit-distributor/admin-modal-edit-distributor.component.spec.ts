import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalEditDistributorComponent } from './admin-modal-edit-distributor.component';

describe('AdminModalAddDistributorComponent', () => {
  let component: AdminModalEditDistributorComponent;
  let fixture: ComponentFixture<AdminModalEditDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalEditDistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalEditDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
