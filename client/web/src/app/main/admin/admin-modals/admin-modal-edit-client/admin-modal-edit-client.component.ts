import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../shared/api/api.service'
import { IClient } from '../../../../shared/models';

@Component({
  selector: 'app-admin-modal-edit-client',
  templateUrl: './admin-modal-edit-client.component.html',
  styleUrls: ['./admin-modal-edit-client.component.scss']
})
export class AdminModalEditClientComponent implements OnInit {

  @Output() clientEditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public client: IClient = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  public editClient(client: IClient): void {
    this.api.client.editClient(client).subscribe(() => {
      this.clientEditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
