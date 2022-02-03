import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service'
import { IDistributor } from '../../../shared/models';

@Component({
  selector: 'app-admin-modal-edit-distributor',
  templateUrl: './admin-modal-edit-distributor.component.html',
  styleUrls: ['./admin-modal-edit-distributor.component.scss']
})
export class AdminModalEditDistributorComponent implements OnInit {

  @Output() distributorEditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public distributor: IDistributor = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  public editDistributor(distributor: IDistributor): void {
    this.api.distributor.editDistributor(distributor).subscribe(() => {
      this.distributorEditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
