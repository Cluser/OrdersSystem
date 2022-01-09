import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalAddInquiryComponent } from './client-modal-add-inquiry.component';

describe('ClientModalAddInquiryComponent', () => {
  let component: ClientModalAddInquiryComponent;
  let fixture: ComponentFixture<ClientModalAddInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientModalAddInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalAddInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
