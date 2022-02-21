import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalAddProjectComponent } from './admin-modal-add-project.component';

describe('AdminModalAddProjectComponent', () => {
  let component: AdminModalAddProjectComponent;
  let fixture: ComponentFixture<AdminModalAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalAddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
