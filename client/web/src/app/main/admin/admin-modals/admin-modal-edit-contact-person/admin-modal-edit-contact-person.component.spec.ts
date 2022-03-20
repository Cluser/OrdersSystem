import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalEditContactPersonComponent } from './admin-modal-edit-contact-person.component';

describe('AdminModalEditContactPersonComponent', () => {
  let component: AdminModalEditContactPersonComponent;
  let fixture: ComponentFixture<AdminModalEditContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AdminModalEditContactPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalEditContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
