import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-purchase-modal-archive',
  templateUrl: './purchase-modal-archive.component.html',
  styleUrls: ['./purchase-modal-archive.component.scss'],
})
export class PurchaseModalArchiveComponent implements OnInit {
  @Output() archiveSelected: EventEmitter<void> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public confirm() {
    this.archiveSelected.emit();
    this.close();
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
