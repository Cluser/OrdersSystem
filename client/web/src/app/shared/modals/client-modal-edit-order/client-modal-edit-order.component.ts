import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IContactPerson, IDistributor, IOrder } from '../../models';

@Component({
  selector: 'app-client-modal-edit-order',
  templateUrl: './client-modal-edit-order.component.html',
  styleUrls: ['./client-modal-edit-order.component.scss']
})
export class PurchaseModalEditOrderComponent implements OnInit {
  
  @Output() orderEdditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  
  public order: any = {};
  public distributors: IDistributor[] = [];
  public contactPersons: IContactPerson[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
    this.getContactPersons(this.order.idDistributor)
  }

  public prepareGrid(): void {
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'item.id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'item.name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'item.model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'price', headerName: 'Cena', sortable: true, filter: true, resizable: true, flex: 3, editable: true },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    this.rowData = this.order.items;
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);

    this.order._totalPrice = this.order.items.reduce((x: any, y: any) => { return x + y.price }, 0);
  }

  public getContactPersons(idDistributor: number): void {
    this.api.contactPerson.getContactPersons({idDistributor: idDistributor}, 1, 1000).subscribe((contactPersons) => this.contactPersons = contactPersons.items);
  }

  public editOrder(order: IOrder): void {
    this.api.order.editOrder(order).subscribe(() => {
      this.orderEdditedEvent.emit();
      this.close();
    })
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
