import { HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AdminCategoriesComponent } from './admin-categories.component';

describe('AdminCategoriesComponent', () => {
  let component: AdminCategoriesComponent;
  let fixture: ComponentFixture<AdminCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AgGridModule.withComponents([]),
        HttpClientTestingModule
      ],
      declarations: [ AdminCategoriesComponent ],
      providers: [HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the grid cells should be as expected', () => {
    // const appElement = fixture.nativeElement;
    // const cellElements = appElement.querySelectorAll('.ag-cell-value');

    // expect(cellElements.length).toEqual(3);
    // expect(cellElements[0].textContent).toEqual("Test Name");
    // expect(cellElements[1].textContent).toEqual("42");
    // expect(cellElements[2].textContent).toEqual("84");
  });
});
