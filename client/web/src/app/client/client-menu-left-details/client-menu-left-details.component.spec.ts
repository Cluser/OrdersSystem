import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMenuLeftDetailsComponent } from './client-menu-left-details.component';

describe('ClientMenuLeftDetailsComponent', () => {
  let component: ClientMenuLeftDetailsComponent;
  let fixture: ComponentFixture<ClientMenuLeftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMenuLeftDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMenuLeftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
