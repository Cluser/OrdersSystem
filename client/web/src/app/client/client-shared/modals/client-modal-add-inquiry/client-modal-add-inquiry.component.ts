import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IInquiryCreate} from '../../models/models';

@Component({
  selector: 'app-client-modal-add-inquiry',
  templateUrl: './client-modal-add-inquiry.component.html',
  styleUrls: ['./client-modal-add-inquiry.component.scss']
})
export class ClientModalAddInquiryComponent implements OnInit {

  @Output() inquiryAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public inquiry: IInquiryCreate = {};
  public item: any;

  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
    { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
    { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
    { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
    { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
  ];
  public rowData: any[] = [];
  public pageSize: number = 1000


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.rowData = this.item;
  }


  public addInquiry(inquiry: IInquiryCreate): void {
    inquiry.idUser = 1;
    this.api.addInquiry(inquiry).subscribe(() => {
      this.inquiryAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
