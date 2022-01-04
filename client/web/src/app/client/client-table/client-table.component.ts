import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../client-shared/api/api.service';
import { IItem } from '../client-shared/models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalAddItemComponent } from '../client-shared/modals/client-modal-add-item/client-modal-add-item.component';



@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { checkboxSelection: true },
    { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true },
    { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, editable: true }
  ];
  public rowData: IItem[] = [];

  public filter: string = '';


  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemsData();
  }


  public getItemsData(): void {
    this.api.getItems().subscribe((response) => this.rowData = response);
  }

  public search(filter: any): void {
    if (filter) {this.api.getItems({'name': filter}).subscribe((response) => this.rowData = response);} else
                {this.api.getItems().subscribe((response) => this.rowData = response);}
  }

  openModal() {
    const modalRef = this.modalService.open(ClientModalAddItemComponent);
    modalRef.componentInstance.itemAdded.subscribe(() => {
      this.modalService.dismissAll();
      this.getItemsData();
    })
 }
}
