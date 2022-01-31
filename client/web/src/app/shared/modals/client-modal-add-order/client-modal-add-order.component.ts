import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IContactPerson, IDistributor, IInquiryCreate, IOrderCreate, IOrderItemCreate} from '../../models';


@Component({
  selector: 'app-client-modal-add-order',
  templateUrl: './client-modal-add-order.component.html',
  styleUrls: ['./client-modal-add-order.component.scss']
})
export class PurchaseModalAddOrderComponent implements OnInit {

  @Output() orderAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  public selectedRows: any[] = []
  
  public order: IInquiryCreate = {};
  public orderItems: IOrderItemCreate[] = [];
  public items: any[] = [];
  public distributors: IDistributor[] = [];
  public contactPersons: IContactPerson[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
  }

  public prepareGrid(): void {
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'item.id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'item.name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'item.model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'price', headerName: 'Cena', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'item.project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'item.user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
    ];

    // Deep copy of items - without reference
    this.rowData = JSON.parse(JSON.stringify(this.items));
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public getContactPersons(idDistributor: number): void {
    this.api.contactPerson.getContactPersons({idDistributor: idDistributor}, 1, 1000).subscribe((contactPersons) => this.contactPersons = contactPersons.items);
  }

  public addOrder(order: IOrderCreate): void {
    order.idUser = 1;
    order.archived = false;
    this.api.order.addOrder(order).subscribe((order: any) => {

      this.selectedRows.forEach((row) => {
        let obj: IOrderItemCreate = { Item_id: row.item.id, order_id: order.id, price: Number(row.price), quantity: Number(row.quantity), status: row.status }
        this.orderItems.push(obj)
      })


      this.api.orderItem.addOrderItems(this.orderItems).subscribe(() => {
        this.orderAddedEvent.emit();
        this.close();
      })
    });
  }

  public onSelectionChanged(selection: any) {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
