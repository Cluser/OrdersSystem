import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../client-shared/api/api.service';
import { IItemToOrder } from '../client-shared/models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalAddItemComponent } from '../client-shared/modals/client-modal-add-item/client-modal-add-item.component';



@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true, resizable: true },
    { field: 'name', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'quantity', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'status', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'idProject', sortable: true, filter: true, resizable: true, editable: true },
    { field: 'idDistributor', sortable: true, filter: true, resizable: true, editable: true }
  ];
  public rowData: IItemToOrder[] = [];

  public user = {
    name: 'Izzat Nadiri',
    age: 26
 }

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemsData();
  }


  public getItemsData(): void {
    this.api.getItemsToOrder().subscribe((response) => this.rowData = response);
  }

  openModal() {
    const modalRef = this.modalService.open(ClientModalAddItemComponent);
    modalRef.componentInstance.itemAdded.subscribe(() => {
      this.modalService.dismissAll();
      this.getItemsData();
    })
 }
}
