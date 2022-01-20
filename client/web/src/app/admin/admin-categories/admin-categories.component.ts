import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { ICategory } from 'src/app/shared/models';
import { AdminModalAddCategoryComponent } from '../admin-modals/admin-modal-add-category/admin-modal-add-category.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCategoriesData();
  }

  public getCategoriesData(): void {
    this.api.category.getCategories({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public openAddCategoryModal(): void {
    const modalRef = this.modalService.open(AdminModalAddCategoryComponent);
    modalRef.componentInstance.categoryAddedEvent.subscribe(() => this.getCategoriesData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  
  public openEditCategoryModal(category: ICategory): void {
    // const modalRef = this.modalService.open(AdminModalEditClientComponent);
    // modalRef.componentInstance.client = client;
    // modalRef.componentInstance.clientEditedEvent.subscribe(() => this.getClientsData());
    // modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

}
