import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColDef } from "ag-grid-community";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "@shared/api/api.service";
import { PurchaseModalAddOfferComponent } from "@purchase/purchase-modals/purchase-modal-add-offer/purchase-modal-add-offer.component";
import { PurchaseModalAddOrderComponent } from "@purchase/purchase-modals/purchase-modal-add-order/purchase-modal-add-order.component";
import { PurchaseModalEditInquiryComponent } from "@purchase/purchase-modals/purchase-modal-edit-inquiry/purchase-modal-edit-inquiry.component";
import { IInquiry, IPInquiry } from "@shared/models";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { PurchaseInquiriesSearchComponent } from "@purchase/purchase-inquiries/purchase-inquiries-search/purchase-inquiries-search.component";
import { PurchaseModalArchiveComponent } from "@purchase/purchase-modals/purchase-modal-archive/purchase-modal-archive.component";

@Component({
  selector: "app-purchase-inquiries",
  templateUrl: "./purchase-inquiries.component.html",
  styleUrls: ["./purchase-inquiries.component.scss"],
})
export class PurchaseInquiriesComponent implements OnInit {
  public columnDefs: ColDef[] = [];
  public grid: IPInquiry = {};
  public pageSize: number = 1000;

  public filter: any = {};
  public selectedMenu: string = "Items";
  public selectedRows: any[] = [];

  public offerAndOrderPossible: boolean = false;

  public faSearch = faSearch;
  public searchPopup: boolean = false;
  @ViewChild(PurchaseInquiriesSearchComponent)
  private purchaseInquiriesSearchComponent = {} as PurchaseInquiriesSearchComponent;

  constructor(private api: ApiService, private modalService: NgbModal, private router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setFilterFromUrl();
    this.getInquiriesData();
  }

  public setFilterFromUrl(): void {
    this.filter.id = this.route.snapshot.queryParamMap.getAll("id").map(Number);
    this.filter.idDistributor = this.route.snapshot.queryParamMap.getAll("idDistributor").map(Number);
    this.filter.idContactPerson = this.route.snapshot.queryParamMap.getAll("idContactPerson").map(Number);
    this.filter.idUser = this.route.snapshot.queryParamMap.getAll("idUser").map(Number);
    this.filter.archived = this.route.snapshot.queryParamMap.getAll("archived").map((x) => x === "true");
  }

  public getInquiriesData(): void {
    this.spinner.show();
    this.api.inquiry.getInquiries(this.filter, 1, this.pageSize).subscribe((response) => {
      (this.grid = response), this.spinner.hide();
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      {
        field: "id",
        headerName: "id",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        sort: "desc",
      },
      {
        field: "distributor.name",
        headerName: "Dystrybutor",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "contactPerson.name",
        headerName: "Sprzedawca",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "user.name",
        headerName: "Użytkownik",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "dateAndTime",
        headerName: "Data",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
    ];
  }

  public openAddOfferModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {
      size: "xl",
    });

    modalRef.componentInstance.offer.idDistributor = this.selectedRows[0].idDistributor;
    modalRef.componentInstance.offer.idContactPerson = this.selectedRows[0].idContactPerson;
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => (rows = rows.items));
    modalRef.componentInstance.offerAddedEvent.subscribe(() => this.router.navigate(["/main/purchase/offers"]));
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOrderModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {
      size: "xl",
    });

    modalRef.componentInstance.order.idDistributor = this.selectedRows[0].idDistributor;
    modalRef.componentInstance.order.idContactPerson = this.selectedRows[0].idContactPerson;
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => (rows = rows.items));
    modalRef.componentInstance.orderAddedEvent.subscribe(() => this.router.navigate(["/main/purchase/orders"]));
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditInquiryModal(inquiry: IInquiry): void {
    const modalRef = this.modalService.open(PurchaseModalEditInquiryComponent, {
      size: "xl",
    });

    modalRef.componentInstance.inquiry = inquiry;
    modalRef.componentInstance.inquiryEdditedEvent.subscribe(() => this.getInquiriesData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openArchiveModal(): void {
    const modalRef = this.modalService.open(PurchaseModalArchiveComponent);
    modalRef.componentInstance.archiveSelected.subscribe(() => this.archiveSelected());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
    this.checkIfOfferAndOrderPosible();
  }

  public archiveSelected(): void {
    this.selectedRows.forEach((inquiry) => {
      inquiry.archived = true;
      this.api.inquiry.editInquiry(inquiry).subscribe(() => {
        this.selectedRows = [];
        this.getInquiriesData();
      });
    });
  }

  private checkIfOfferAndOrderPosible(): void {
    this.offerAndOrderPossible = true;
    let firtSelectedInquiryDistributor = this.selectedRows[0].distributor.id;

    this.selectedRows.forEach((inquiry) => {
      if (inquiry.distributor.id !== firtSelectedInquiryDistributor) {
        this.offerAndOrderPossible = false;
      }
    });
  }

  public changeFilter(filter: any) {
    this.router.navigate(["/main/purchase/inquiries"], { queryParams: filter });
    this.getInquiriesData();
  }
}
