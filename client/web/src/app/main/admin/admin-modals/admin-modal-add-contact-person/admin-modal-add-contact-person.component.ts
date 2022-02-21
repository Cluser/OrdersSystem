import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../shared/api/api.service'
import { IContactPerson, IDistributor } from '../../../../shared/models';

@Component({
  selector: 'app-admin-modal-add-contact-person',
  templateUrl: './admin-modal-add-contact-person.component.html',
  styleUrls: ['./admin-modal-add-contact-person.component.scss']
})
export class AdminModalAddContactPersonComponent implements OnInit {

  @Output() contactPersonAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public contactPerson: IContactPerson = {};
  public distributors: IDistributor[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getDistributors();
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public addContactPerson(contactPerson: IContactPerson): void {
    this.api.contactPerson.addContactPersons(contactPerson).subscribe(() => {
      this.contactPersonAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
