import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactPersonsComponent } from './admin-contact-persons.component';

describe('AdminContactPersonsComponent', () => {
  let component: AdminContactPersonsComponent;
  let fixture: ComponentFixture<AdminContactPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactPersonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
