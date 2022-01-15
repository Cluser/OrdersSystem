import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IDistributor, IInquiryCreate, IOrderCreate} from '../../models';


@Component({
  selector: 'app-client-modal-add-order',
  templateUrl: './client-modal-add-order.component.html',
  styleUrls: ['./client-modal-add-order.component.scss']
})
export class ClientModalAddOrderComponent implements OnInit {

  @Output() orderAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  
  public inquiry: IInquiryCreate = {};
  public items: any = [];
  public distributors: IDistributor[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
  }

  public prepareGrid(): void {
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'item.project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    this.rowData = this.items;
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public addInquiry(order: IOrderCreate): void {
    order.idUser = 1;
    this.api.order.addOrder(order).subscribe((order: any) => {
      this.api.orderItem.addOrderItems(this.items, order, 5, 5, 'sss').subscribe(() => {
        this.orderAddedEvent.emit();
        this.close();
      })
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
