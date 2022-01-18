import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalEditProjectComponent } from './admin-modal-edit-project.component';

describe('AdminModalEditProjectComponent', () => {
  let component: AdminModalEditProjectComponent;
  let fixture: ComponentFixture<AdminModalEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalEditProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
