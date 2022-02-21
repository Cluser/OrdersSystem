import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../../shared/api/api.service';
import { IContactPerson, IDistributor, IInquiry } from '../../../shared/models';

@Component({
  selector: 'app-purchase-modal-edit-inquiry',
  templateUrl: './purchase-modal-edit-inquiry.component.html',
  styleUrls: ['./purchase-modal-edit-inquiry.component.scss']
})
export class PurchaseModalEditInquiryComponent implements OnInit {

  
  @Output() inquiryEdditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  
  public inquiry: IInquiry = {};
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
      { field: 'item.category.name', headerName: 'Category', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true, type: 'rightAligned'},
      { field: 'item.project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'item.user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    // Deep copy of items - without reference
    this.rowData = JSON.parse(JSON.stringify(this.inquiry.items));
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => {
      this.distributors = distributors.items
      this.getContactPersons(this.inquiry.idDistributor)
    });
  }

  public getContactPersons(idDistributor?: number): void {
    this.api.contactPerson.getContactPersons({idDistributor: idDistributor}, 1, 1000).subscribe((contactPersons) => this.contactPersons = contactPersons.items);
  }

  public editInquiry(inquiry: IInquiry): void {
    this.api.inquiry.editInquiry(inquiry).subscribe(() => {
      this.inquiryEdditedEvent.emit();
      this.close();
    })
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
