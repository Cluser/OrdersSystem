import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColDef } from "ag-grid-community";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "@shared/api/api.service";
import { PurchaseModalAddInquiryComponent } from "@purchase/purchase-modals/purchase-modal-add-inquiry/purchase-modal-add-inquiry.component";
import { PurchaseModalAddItemComponent } from "@purchase/purchase-modals/purchase-modal-add-item/purchase-modal-add-item.component";
import { PurchaseModalAddOfferComponent } from "@purchase/purchase-modals/purchase-modal-add-offer/purchase-modal-add-offer.component";
import { PurchaseModalAddOrderComponent } from "@purchase/purchase-modals/purchase-modal-add-order/purchase-modal-add-order.component";
import { PurchaseModalEditItemComponent } from "@purchase/purchase-modals/purchase-modal-edit-item/purchase-modal-edit-item.component";
import { PurchaseModalImportItemsComponent } from "@purchase/purchase-modals/purchase-modal-import-items/purchase-modal-import-items.component";
import { PurchaseItemsSearchComponent } from "@purchase/purchase-items/purchase-items-search/purchase-items-search.component";
import { PurchaseModalArchiveComponent } from "@purchase/purchase-modals/purchase-modal-archive/purchase-modal-archive.component";
import { IItem, IPItem } from "@shared/models";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-purchase-items",
  templateUrl: "./purchase-items.component.html",
  styleUrls: ["./purchase-items.component.scss"],
})
export class PurchaseItemsComponent implements OnInit {
  public faSearch = faSearch;

  public columnDefs: ColDef[] = [];
  public grid: IPItem = {};
  public pageSize: number = 1000;

  public filter: any = {};
  public selectedMenu: string = "Items";
  public selectedRows: any[] = [];

  public searchPopup: boolean = false;
  @ViewChild(PurchaseItemsSearchComponent)
  private purchaseItemsSearchComponent = {} as PurchaseItemsSearchComponent;

  constructor(private api: ApiService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.setFilterFromUrl();
    this.getItemsData();
  }

  public setFilterFromUrl(): void {
    this.filter.id = this.route.snapshot.queryParamMap.getAll("id").map(Number);
    this.filter.name = this.route.snapshot.queryParamMap.getAll("name").map(String);
    this.filter.model = this.route.snapshot.queryParamMap.getAll("model").map(String);
    this.filter.quantity = this.route.snapshot.queryParamMap.getAll("quantity").map(Number);
    this.filter.idProject = this.route.snapshot.queryParamMap.getAll("idProject").map(Number);
    this.filter.idCategory = this.route.snapshot.queryParamMap.getAll("idCategory").map(Number);
    this.filter.archived = this.route.snapshot.queryParamMap.getAll("archived").map((x) => x === "true");
    this.filter.status = this.route.snapshot.queryParamMap.getAll("status").map(String);
  }

  public getItemsData(): void {
    this.spinner.show();
    this.api.item.getItems(this.filter, "", "", 1, this.pageSize).subscribe((response) => {
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
        field: "name",
        headerName: "Nazwa",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "model",
        headerName: "Model",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "category.name",
        headerName: "Kategoria",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "quantity",
        headerName: "Ilość",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "project.name",
        headerName: "Projekt",
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: "user.name",
        headerName: "Zgłaszający",
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

  public openAddItemModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddItemComponent);
    modalRef.componentInstance.itemAddedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openImportItemsModal(): void {
    const modalRef = this.modalService.open(PurchaseModalImportItemsComponent);
    modalRef.componentInstance.itemsImportedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddInquiryModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddInquiryComponent, {
      size: "xl",
    });
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.inquiryAddedEvent.subscribe(() => this.router.navigate(["/main/purchase/inquiries"]));
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOfferModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {
      size: "xl",
    });
    let items: any[] = [];

    this.selectedRows.forEach((row) => items.push({ item: row }));

    modalRef.componentInstance.items = items;
    modalRef.componentInstance.offerAddedEvent.subscribe(() => this.router.navigate(["/main/purchase/offers"]));
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOrderModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {
      size: "xl",
    });
    let items: any[] = [];

    this.selectedRows.forEach((row) => items.push({ item: row }));

    modalRef.componentInstance.items = items;
    modalRef.componentInstance.orderAddedEvent.subscribe(() => this.router.navigate(["/main/purchase/orders"]));
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditItemModal(item: IItem): void {
    const modalRef = this.modalService.open(PurchaseModalEditItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.itemEditedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openArchiveModal(): void {
    const modalRef = this.modalService.open(PurchaseModalArchiveComponent);
    modalRef.componentInstance.archiveSelected.subscribe(() => this.archiveSelected());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public search(filter: any): void {
    if (filter) {
      this.api.item.getItems({ name: filter }, "", "", 1, 1000).subscribe((response) => (this.grid = response));
    } else {
      this.api.item.getItems().subscribe((response) => (this.grid = response));
    }
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

  public archiveSelected(): void {
    this.selectedRows.forEach((item) => {
      item.archived = true;
      this.api.item.editItem(item).subscribe(() => {
        this.selectedRows = [];
        this.getItemsData();
      });
    });
  }

  public changeFilter(filter: any) {
    this.router.navigate(["/main/purchase/items"], { queryParams: filter });
    this.getItemsData();
  }

  public findInquiries(): void {
    let filter: any = { id: [] };
    this.selectedRows.forEach((item) => {
      item.inquiries.forEach((inquiry: any) => {
        filter.id.push(inquiry.inquiry_id);
      });
    });
    if (filter.id.length == 0) filter.id.push(0);
    this.router.navigate(["/main/purchase/inquiries"], { queryParams: filter });
  }

  public findOffers(): void {
    let filter: any = { id: [] };
    this.selectedRows.forEach((item) => {
      item.offers.forEach((offer: any) => {
        filter.id.push(offer.offer_id);
      });
    });
    if (filter.id.length == 0) filter.id.push(0);
    this.router.navigate(["/main/purchase/offers"], { queryParams: filter });
  }

  public findOrders(): void {
    let filter: any = { id: [] };
    this.selectedRows.forEach((item) => {
      item.orders.forEach((order: any) => {
        filter.id.push(order.order_id);
      });
    });
    if (filter.id.length == 0) filter.id.push(0);
    this.router.navigate(["/main/purchase/orders"], { queryParams: filter });
  }

  @HostListener("document:keyup", ["$event"])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      switch (event.key) {
        case "a":
          this.searchPopup = !this.searchPopup;
      }
    } else {
      switch (event.key) {
        case "f":
          this.searchPopup = !this.searchPopup;
      }
    }
  }
}
