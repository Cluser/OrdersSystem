import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../shared/api/api.service'
import { IClient } from '../../../../shared/models';

@Component({
  selector: 'app-admin-modal-add-client',
  templateUrl: './admin-modal-add-client.component.html',
  styleUrls: ['./admin-modal-add-client.component.scss']
})
export class AdminModalAddClientComponent implements OnInit {

  @Output() clientAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public client: IClient = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  public addClient(client: IClient): void {
    this.api.client.addClients(client).subscribe(() => {
      this.clientAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
