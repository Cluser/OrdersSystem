import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMenuRightComponent } from './client-menu-right.component';

describe('ClientMenuRightComponent', () => {
  let component: ClientMenuRightComponent;
  let fixture: ComponentFixture<ClientMenuRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMenuRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMenuRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
