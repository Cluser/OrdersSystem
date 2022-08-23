import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ApiService } from "@shared/api/api.service";
import { IDistributor } from "@shared/models";

@Component({
  selector: "app-admin-modal-add-distributor",
  templateUrl: "./admin-modal-add-distributor.component.html",
  styleUrls: ["./admin-modal-add-distributor.component.scss"],
})
export class AdminModalAddDistributorComponent implements OnInit {
  @Output() distributorAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public distributor: IDistributor = {};

  constructor(private api: ApiService) {}

  ngOnInit() {}

  public addDistributor(distributor: IDistributor): void {
    this.api.distributor.addDistributors(distributor).subscribe(() => {
      this.distributorAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
