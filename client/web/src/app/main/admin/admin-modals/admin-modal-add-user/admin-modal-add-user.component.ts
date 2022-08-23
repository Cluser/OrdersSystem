import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ApiService } from "@shared/api/api.service";
import { IUser } from "@shared/models";

@Component({
  selector: "app-admin-modal-add-user",
  templateUrl: "./admin-modal-add-user.component.html",
  styleUrls: ["./admin-modal-add-user.component.scss"],
})
export class AdminModalAddUserComponent implements OnInit {
  @Output() userAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public user: IUser = {};

  constructor(private api: ApiService) {}

  ngOnInit() {}

  public addUser(user: IUser): void {
    user.password = "1";
    this.api.user.addUser(user).subscribe(() => {
      this.userAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
