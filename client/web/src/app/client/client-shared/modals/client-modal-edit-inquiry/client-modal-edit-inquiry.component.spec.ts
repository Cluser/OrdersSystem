import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalEditInquiryComponent } from './client-modal-edit-inquiry.component';

describe('ClientModalEditInquiryComponent', () => {
  let component: ClientModalEditInquiryComponent;
  let fixture: ComponentFixture<ClientModalEditInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalEditInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalEditInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
