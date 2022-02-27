import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../shared/api/api.service'
import { IUser } from '../../../../shared/models';

@Component({
  selector: 'app-admin-modal-edit-user',
  templateUrl: './admin-modal-edit-user.component.html',
  styleUrls: ['./admin-modal-edit-user.component.scss']
})
export class AdminModalEditUserComponent implements OnInit {

  @Output() userEditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public user: IUser = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  public editUser(user: IUser): void {
    this.api.user.editUser(user).subscribe(() => {
      this.userEditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
