import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalEditOrderComponent } from '../purchase-modals/purchase-modal-edit-order/purchase-modal-edit-order.component';
import { IOrder, IPOrder } from 'src/app/shared/models';
import { currencyFormatter } from '../../../shared/functions/formatters'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PurchaseOrdersSearchComponent } from './purchase-orders-search/purchase-orders-search.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public grid: IPOrder = {};
  public pageSize: number = 1000

  public filter: any = {};
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  public faSearch = faSearch
  public searchPopup: boolean = false;
  @ViewChild(PurchaseOrdersSearchComponent) private purchaseOrdersSearchComponent = {} as PurchaseOrdersSearchComponent;

  constructor(private api: ApiService, private modalService: NgbModal, private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setFilterFromUrl()
    this.getOrdersData()
  }

  public setFilterFromUrl(): void {
    this.filter.id = this.route.snapshot.queryParamMap.getAll('id').map(Number);
    this.filter.idDistributor = this.route.snapshot.queryParamMap.getAll('idDistributor').map(Number);
    this.filter.idContactPerson = this.route.snapshot.queryParamMap.getAll('idContactPerson').map(Number);
    this.filter.idUser = this.route.snapshot.queryParamMap.getAll('idUser').map(Number);
    this.filter.archived = this.route.snapshot.queryParamMap.getAll('archived').map(x => x === 'true');
  }

  public getOrdersData(): void {
    this.spinner.show();
    this.api.order.getOrders(this.filter, '', '', 1, this.pageSize).subscribe((response) => {
      this.grid = response
      this.calculateOrdersPrices(this.grid.items)
      this.spinner.hide()
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1, sort: 'desc' },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'contactPerson.name', headerName: 'Sprzedawca', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'totalPrice', headerName: 'Kwota', sortable: true, filter: true, resizable: true, flex: 3, valueFormatter: params => currencyFormatter(params, params.data.items[0].currency), type: 'rightAligned' },
    ];
  }

  public openEditOrderModal(order: IOrder): void {
    const modalRef = this.modalService.open(PurchaseModalEditOrderComponent, {size: 'xl'});
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.orderEdditedEvent.subscribe(() => this.getOrdersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  private calculateOrdersPrices(orders: any): void {
    orders.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price * cur.quantity, 0))
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

  public archiveSelected(): void {
    this.selectedRows.forEach((order) => {
      order.archived = true;
      this.api.order.editOrder(order).subscribe(() => {
        this.selectedRows = [];
        this.getOrdersData();
      });
    })
  }

  public changeFilter(filter: any) {
    this.router.navigate(['/main/purchase/orders'], { queryParams: filter});
    this.getOrdersData();
  }
}
