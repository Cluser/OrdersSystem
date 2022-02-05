import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalAddOfferComponent } from 'src/app/shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from 'src/app/shared/modals/client-modal-add-order/client-modal-add-order.component';
import { PurchaseModalEditInquiryComponent } from 'src/app/shared/modals/client-modal-edit-inquiry/client-modal-edit-inquiry.component';
import { IInquiry } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-inquiries',
  templateUrl: './purchase-inquiries.component.html',
  styleUrls: ['./purchase-inquiries.component.scss']
})
export class PurchaseInquiriesComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  public offerAndOrderPossible: boolean = false;

  constructor(private api: ApiService, private modalService: NgbModal, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getInquiriesData()
  }

  public getInquiriesData(): void {
    this.spinner.show();
    this.api.inquiry.getInquiries({archived: false}, 1, this.pageSize).subscribe((response) => {this.rowData = response.items, this.spinner.hide()});
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1, sort: 'desc' },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'contactPerson.name', headerName: 'Sprzedawca', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
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

  public openEditInquiryModal(inquiry: IInquiry): void {
    const modalRef = this.modalService.open(PurchaseModalEditInquiryComponent, {size: 'xl'});

    modalRef.componentInstance.inquiry = inquiry;
    modalRef.componentInstance.inquiryEdditedEvent.subscribe(() => this.getInquiriesData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
    this.checkIfOfferAndOrderPosible();
  }

  public archiveSelected(): void {
    this.selectedRows.forEach((inquiry) => {
      inquiry.archived = true;
      this.api.inquiry.editInquiry(inquiry).subscribe();
    })
    this.selectedRows = [];
    this.getInquiriesData();
  }

  private checkIfOfferAndOrderPosible(): void {
    this.offerAndOrderPossible = true;
    let firtSelectedInquiryDistributor = this.selectedRows[0].distributor.id

    this.selectedRows.forEach((inquiry) => {
      if (inquiry.distributor.id !== firtSelectedInquiryDistributor) {
        this.offerAndOrderPossible = false;
      }
    })
  }
}
