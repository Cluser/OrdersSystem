import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalAddOfferComponent } from '../purchase-modals/purchase-modal-add-offer/purchase-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from '../purchase-modals/purchase-modal-add-order/purchase-modal-add-order.component';
import { PurchaseModalEditOfferComponent } from '../purchase-modals/purchase-modal-edit-offer/purchaset-modal-edit-offer.component';
import { IOffer, IPOffer } from 'src/app/shared/models';
import { currencyFormatter } from '../../../shared/functions/formatters'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PurchaseOffersSearchComponent } from './purchase-offers-search/purchase-offers-search.component';

@Component({
  selector: 'app-purchase-offers',
  templateUrl: './purchase-offers.component.html',
  styleUrls: ['./purchase-offers.component.scss']
})
export class PurchaseOffersComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public grid: IPOffer = {};
  public pageSize: number = 1000

  public filter: any = {};
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  public orderPossible: boolean = false;

  public faSearch = faSearch
  public searchPopup: boolean = false;
  @ViewChild(PurchaseOffersSearchComponent) private purchaseOffersSearchComponent = {} as PurchaseOffersSearchComponent;

  constructor(private api: ApiService, private modalService: NgbModal, private router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setFilterFromUrl();
    this.getOffersData()
  }

  public setFilterFromUrl(): void {
    this.filter.id = this.route.snapshot.queryParamMap.getAll('id').map(Number);
    this.filter.idDistributor = this.route.snapshot.queryParamMap.getAll('idDistributor').map(Number);
    this.filter.idContactPerson = this.route.snapshot.queryParamMap.getAll('idContactPerson').map(Number);
    this.filter.idUser = this.route.snapshot.queryParamMap.getAll('idUser').map(Number);
    this.filter.archived = this.route.snapshot.queryParamMap.getAll('archived').map(x => x === 'true');
  }

  public getOffersData(): void {
    this.spinner.show();
    this.api.offer.getOffers(this.filter, 1, this.pageSize).subscribe((response) => {
      this.grid = response
      this.calculateOffersPrices(this.grid.items)
      this.spinner.hide()
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1, sort: 'desc' },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'contactPerson.name', headerName: 'Sprzedawca', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'totalPrice', headerName: 'Kwota', sortable: true, filter: true, resizable: true, flex: 3, valueFormatter: params => currencyFormatter(params), type: 'rightAligned' },
    ];
  }

  private calculateOffersPrices(offers: any): void {
    offers.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price * cur.quantity, 0) )
  }

  public openAddOfferModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {size: 'xl'});

    modalRef.componentInstance.offer.idDistributor = this.selectedRows[0].idDistributor
    modalRef.componentInstance.offer.idContactPerson = this.selectedRows[0].idContactPerson
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    modalRef.componentInstance.offerAddedEvent.subscribe(() => this.router.navigate(['/purchase/offers']) );
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOrderModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {size: 'xl'});

    modalRef.componentInstance.order.idDistributor = this.selectedRows[0].idDistributor
    modalRef.componentInstance.order.idContactPerson = this.selectedRows[0].idContactPerson
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    modalRef.componentInstance.orderAddedEvent.subscribe(() => this.router.navigate(['/purchase/orders']) );
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditOfferModal(offer: IOffer): void {
    const modalRef = this.modalService.open(PurchaseModalEditOfferComponent, {size: 'xl'});
    
    modalRef.componentInstance.offer = offer;
    modalRef.componentInstance.offerEdditedEvent.subscribe(() => this.getOffersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
    this.checkIfOrderPosible();
  }

  private checkIfOrderPosible(): void {
    this.orderPossible = true;
    let firtSelectedOrderDistributor = this.selectedRows[0].distributor.name

    this.selectedRows.forEach((order) => {
      if (order.distributor.name !== firtSelectedOrderDistributor) {
        this.orderPossible = false;
      }
    })
  }

  public archiveSelected(): void {
    this.selectedRows.forEach((offer) => {
      offer.archived = true;
      this.api.offer.editOffer(offer).subscribe(() => {
        this.selectedRows = [];
        this.getOffersData();
      });
    })
  }

  public changeFilter(filter: any) {
    this.router.navigate(['/purchase/offers'], { queryParams: filter});
    this.getOffersData();
  }
}
