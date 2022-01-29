import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api/api.service';
import { ICategory } from 'src/app/shared/models';
import { AdminModalAddCategoryComponent } from '../admin-modals/admin-modal-add-category/admin-modal-add-category.component';
import { AdminModalEditCategoryComponent } from '../admin-modals/admin-modal-edit-category/admin-modal-edit-category.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  constructor(private api: ApiService, private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCategoriesData();
  }

  public getCategoriesData(): void {
    this.spinner.show();
    this.api.category.getCategories({}, 1, this.pageSize).subscribe((response) => { this.rowData = response.items; this.spinner.hide() });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1, sort: 'desc'  },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public openAddCategoryModal(): void {
    const modalRef = this.modalService.open(AdminModalAddCategoryComponent);
    modalRef.componentInstance.categoryAddedEvent.subscribe(() => this.getCategoriesData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  
  public openEditCategoryModal(category: ICategory): void {
    const modalRef = this.modalService.open(AdminModalEditCategoryComponent);
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.categoryEditedEvent.subscribe(() => this.getCategoriesData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

}
