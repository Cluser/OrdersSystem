import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { AdminModalAddDistributorComponent } from '../admin-modals/admin-modal-add-distributor/admin-modal-add-distributor.component';

@Component({
  selector: 'app-admin-distributors',
  templateUrl: './admin-distributors.component.html',
  styleUrls: ['./admin-distributors.component.scss']
})
export class AdminDistributorsComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDistributorsData();
  }

  public getDistributorsData(): void {
    this.api.distributor.getDistributors({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'email', headerName: 'E-mail', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'phone', headerName: 'Telefon', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'address', headerName: 'Adres', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'description', headerName: 'Opis', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public openAddDistributorModal(): void {
    const modalRef = this.modalService.open(AdminModalAddDistributorComponent);
    modalRef.componentInstance.distributorAddedEvent.subscribe(() => this.getDistributorsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

}
