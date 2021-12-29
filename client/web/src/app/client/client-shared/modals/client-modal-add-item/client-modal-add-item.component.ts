import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api/api.service';
import { IItemToOrder } from '../../models/models';

@Component({
  selector: 'app-client-modal-add-item',
  templateUrl: './client-modal-add-item.component.html',
  styleUrls: ['./client-modal-add-item.component.scss']
})
export class ClientModalAddItemComponent implements OnInit {

  @Output() itemAdded: EventEmitter<any> = new EventEmitter();

  public item: IItemToOrder = {};

  constructor(private api: ApiService) { }

  ngOnInit() {}

  public addItem(item: IItemToOrder): void {
    this.api.addItemsToOrder(item).subscribe(() => this.close());
  }

  public close() {
    this.itemAdded.emit();
  }

}
