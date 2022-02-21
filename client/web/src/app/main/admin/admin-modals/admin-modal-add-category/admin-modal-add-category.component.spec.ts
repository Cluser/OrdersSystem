import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalAddCategoryComponent } from './admin-modal-add-category.component';

describe('AdminModalAddCategoryComponent', () => {
  let component: AdminModalAddCategoryComponent;
  let fixture: ComponentFixture<AdminModalAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
