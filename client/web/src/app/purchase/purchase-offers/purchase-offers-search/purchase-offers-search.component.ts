import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { IContactPerson, IDistributor } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-offers-search',
  templateUrl: './purchase-offers-search.component.html',
  styleUrls: ['./purchase-offers-search.component.scss']
})
export class PurchaseOffersSearchComponent implements OnInit {

  @Input() filters: any = {};
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  public distributors: IDistributor[] = [];
  public contactPersons: IContactPerson[] = [];
  public archiveStatus: Boolean[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
    this.api.contactPerson.getContactPersons({}, 1, 1000).subscribe((contactPersons) => this.contactPersons = contactPersons.items);
  }

  public changeFilters(): void {
      this.filtersChanged.emit(this.filters);
  }

  public selectFilter(array: any[], value: any) {
    var index = array.indexOf(value);
    if (index === -1) { array.push(value); } else { array.splice(index, 1); }
  }

  public checkFilter(array: any[], value: any): boolean {
    let exist = false;
    array.forEach((element) => { if (element == value) { exist = true} })

    if (exist) { return true } else { return false};
  }

}