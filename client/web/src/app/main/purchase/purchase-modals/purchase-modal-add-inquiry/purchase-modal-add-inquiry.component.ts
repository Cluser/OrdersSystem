import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AuthService } from 'src/app/shared/api/authentication/auth.service';
import { ApiService } from '../../../../shared/api/api.service';
import { IContactPerson, IDistributor, IInquiry, IInquiryItem, IUser } from '../../../../shared/models';

@Component({
  selector: 'app-purchase-modal-add-inquiry',
  templateUrl: './purchase-modal-add-inquiry.component.html',
  styleUrls: ['./purchase-modal-add-inquiry.component.scss']
})
export class PurchaseModalAddInquiryComponent implements OnInit {

  @Output() inquiryAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  public selectedRows: any[] = [];
  
  public inquiry: IInquiry = {};
  public items: any = [];
  public inquiryItems: IInquiryItem[] = [];
  public distributors: IDistributor[] = [];
  public contactPersons: IContactPerson[] = [];
  public user: IUser = {}


  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
    this.getUser();
  }

  public prepareGrid(): void {
    this.columnDefs = [
      // { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'category.name', headerName: 'Category', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true, type: 'rightAligned'},
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    
    // Deep copy of items - without reference
    this.rowData = JSON.parse(JSON.stringify(this.items));
  }

  public onCellEditingStopped(e: any): void {
    this.rowData[e.rowIndex] = e.data;
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public getContactPersons(idDistributor: number): void {
    this.api.contactPerson.getContactPersons({idDistributor: idDistributor}, 1, 1000).subscribe((contactPersons) => this.contactPersons = contactPersons.items);
  }

  private getUser(): void {
    this.authService.getLoggedInUser().subscribe((user) => this.user = user)
  }

  public addInquiry(inquiry: IInquiry): void {
    inquiry.idUser = this.user.id;
    inquiry.archived = false;
    this.api.inquiry.addInquiry(inquiry).subscribe((inquiry: any) => {


      // this.selectedRows.forEach((row) => {
      //   console.log(row)
      //   let obj: IInquiryItem = { Item_id: row.id, inquiry_id: inquiry.id, quantity: Number(row.quantity), status: row.status }
      //   this.inquiryItems.push(obj)
      // })
      this.items.forEach((item: any) => {
        let obj: IInquiryItem = { Item_id: item.id, inquiry_id: inquiry.id, quantity: Number(item.quantity), status: item.status }
        this.inquiryItems.push(obj)
      })

      this.api.inquiryItem.addInquiryItems(this.inquiryItems).subscribe(() => {
        this.inquiryAddedEvent.emit();
        this.close();
      })
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

}
