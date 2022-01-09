import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCenterComponent } from './client-center.component';

describe('ClientCenterComponent', () => {
  let component: ClientCenterComponent;
  let fixture: ComponentFixture<ClientCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
