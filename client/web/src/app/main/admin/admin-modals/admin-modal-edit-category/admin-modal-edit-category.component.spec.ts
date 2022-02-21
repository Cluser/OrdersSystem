import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalEditCategoryComponent } from './admin-modal-edit-category.component';

describe('AdminModalEditCategoryComponent', () => {
  let component: AdminModalEditCategoryComponent;
  let fixture: ComponentFixture<AdminModalEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalEditCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
