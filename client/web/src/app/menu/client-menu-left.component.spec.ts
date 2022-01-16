import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMenuLeftComponent } from './client-menu-left.component';

describe('ClientMenuLeftComponent', () => {
  let component: ClientMenuLeftComponent;
  let fixture: ComponentFixture<ClientMenuLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMenuLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
