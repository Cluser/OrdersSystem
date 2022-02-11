import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalAddInquiryComponent } from 'src/app/shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { PurchaseModalAddItemComponent } from 'src/app/shared/modals/client-modal-add-item/client-modal-add-item.component';
import { PurchaseModalAddOfferComponent } from 'src/app/shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from 'src/app/shared/modals/client-modal-add-order/client-modal-add-order.component';
import { PurchaseModalEditItemComponent } from 'src/app/shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { IItem, IPItem } from 'src/app/shared/models';
import { PurchaseItemsSearchComponent } from './purchase-items-search/purchase-items-search.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-purchase-items',
  templateUrl: './purchase-items.component.html',
  styleUrls: ['./purchase-items.component.scss']
})
export class PurchaseItemsComponent implements OnInit {
  public faSearch = faSearch

  public columnDefs: ColDef[] = []
  public grid: IPItem = {};
  public pageSize: number = 1000

  public filter: any = {};
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  public searchPopup: boolean = false;
  @ViewChild(PurchaseItemsSearchComponent) private purchaseItemsSearchComponent = {} as PurchaseItemsSearchComponent;


  constructor(private api: ApiService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, ) { 
  }

  ngOnInit(): void {
    this.changeFilter({archived: false});
    this.setFilterFromUrl();
    this.getItemsData();
  }

  public setFilterFromUrl(): void {
    this.filter.idProject = this.route.snapshot.queryParamMap.getAll('idProject').map(Number);
    this.filter.idCategory = this.route.snapshot.queryParamMap.getAll('idCategory').map(Number);
    this.filter.archived = this.route.snapshot.queryParamMap.getAll('archiveStatus').map(String);
    this.filter.status = this.route.snapshot.queryParamMap.getAll('status').map(String);
  }

  public getItemsData(): void {
    this.spinner.show();
    this.api.item.getItems(this.filter, '', '', 1, this.pageSize).subscribe((response) => { this.grid = response, this.spinner.hide();});
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1, sort: 'desc' },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'category.name', headerName: 'Kategoria', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, },
      { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3 }
    ];

  }

  public openAddItemModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddItemComponent);
    modalRef.componentInstance.itemAddedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddInquiryModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddInquiryComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.inquiryAddedEvent.subscribe(() => this.router.navigate(['/purchase/inquiries']) );
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOfferModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {size: 'xl'});
    let items: any[] = []

    this.selectedRows.forEach((row) => items.push({item: row}))

    modalRef.componentInstance.items = items;
    modalRef.componentInstance.offerAddedEvent.subscribe(() => this.router.navigate(['/purchase/offers']) );
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOrderModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {size: 'xl'});
    let items: any[] = []

    this.selectedRows.forEach((row) => items.push({item: row}))

    modalRef.componentInstance.items = items;
    modalRef.componentInstance.orderAddedEvent.subscribe(() => this.router.navigate(['/purchase/orders']) );
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditItemModal(item: IItem): void {
    const modalRef = this.modalService.open(PurchaseModalEditItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.itemEditedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public search(filter: any): void {
    if (filter) {this.api.item.getItems({'name': filter}, '', '', 1, 1000).subscribe((response) => this.grid = response);} else
                {this.api.item.getItems().subscribe((response) => this.grid = response);}
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

  public archiveSelected(): void {
    this.selectedRows.forEach((item) => {
      item.archived = true;
      this.api.item.editItem(item).subscribe();
    })
    this.selectedRows = [];
    this.getItemsData();
  }

  public changeFilter(filter: any) {
    this.router.navigate(['/purchase/items'], { queryParams: filter});
    this.getItemsData();
  }

  @HostListener('document:keyup', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      switch(event.key) {
        case 'a': this.searchPopup = !this.searchPopup
      }
    } else {
      switch(event.key) {
        case 'f': this.searchPopup = !this.searchPopup
      }
    }
  }
  
}
