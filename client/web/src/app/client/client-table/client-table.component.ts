import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../client-shared/api/api.service';
import { IItem } from '../client-shared/models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalAddItemComponent } from '../client-shared/modals/client-modal-add-item/client-modal-add-item.component';
import { ClientModalEditItemComponent } from '../client-shared/modals/client-modal-edit-item/client-modal-edit-item.component';



@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
    


  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemsData();
  }

  public test(event: any) {
    console.log(event);
  }

  public getItemsData(): void {
    this.api.getItems({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5 },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public getInquiriesData(): void {
    this.api.getInquiries({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5 },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public getOrdersData(): void {
    this.api.getOrders({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5 },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public search(filter: any): void {
    if (filter) {this.api.getItems({'name': filter}, 1, 1000).subscribe((response) => this.rowData = response.items);} else
                {this.api.getItems().subscribe((response) => this.rowData = response.items);}
  }

  public selectMenu(menu: string) {
    this.selectedMenu = menu;

    switch (this.selectedMenu) {
      case 'Items':
        this.getItemsData();
        break;
      case 'Inquiries':
        this.getInquiriesData();
        break;
      case 'Orders':
        this.getOrdersData();
        break;

    }
  }

  openAddItemModal() {
    const modalRef = this.modalService.open(ClientModalAddItemComponent);
    modalRef.componentInstance.itemAdded.subscribe(() => {
      this.modalService.dismissAll();
      this.getItemsData();
    })
 }

  openEditItemModal(item: IItem) {
    const modalRef = this.modalService.open(ClientModalEditItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.itemEdited.subscribe(() => {
      this.modalService.dismissAll();
      this.getItemsData();
    })
  }
}
