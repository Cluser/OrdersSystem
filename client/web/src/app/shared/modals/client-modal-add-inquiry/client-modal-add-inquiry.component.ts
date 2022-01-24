import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IContactPerson, IDistributor, IInquiryCreate, IInquiryItem } from '../../models';

@Component({
  selector: 'app-client-modal-add-inquiry',
  templateUrl: './client-modal-add-inquiry.component.html',
  styleUrls: ['./client-modal-add-inquiry.component.scss']
})
export class PurchaseModalAddInquiryComponent implements OnInit {

  @Output() inquiryAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  public selectedRows: any[] = [];
  
  public inquiry: IInquiryCreate = {};
  public items: any = [];
  public inquiryItems: IInquiryItem[] = [];
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
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
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

  public addInquiry(inquiry: IInquiryCreate): void {
    inquiry.idUser = 1;
    inquiry.archived = false;
    this.api.inquiry.addInquiry(inquiry).subscribe((inquiry: any) => {


      this.selectedRows.forEach((row) => {
        console.log(row)
        let obj: IInquiryItem = { Item_id: row.id, inquiry_id: inquiry.id, quantity: Number(row.quantity), status: row.status }
        this.inquiryItems.push(obj)
      })

      this.api.inquiryItem.addInquiryItems(this.inquiryItems).subscribe(() => {
        this.inquiryAddedEvent.emit();
        this.close();
      })
    //   this.api.inquiryItem.addInquiryItems(this.items, inquiry, 5, 'sss').subscribe(() => {
    //     this.inquiryAddedEvent.emit();
    //     this.close();
    //   })
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

}
