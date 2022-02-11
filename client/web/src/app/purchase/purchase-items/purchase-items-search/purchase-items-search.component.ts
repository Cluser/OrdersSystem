import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { ICategory, IProject } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-items-search',
  templateUrl: './purchase-items-search.component.html',
  styleUrls: ['./purchase-items-search.component.scss']
})
export class PurchaseItemsSearchComponent implements OnInit {

  @Input() filters: any = {};
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  public projects: IProject[] = [];
  public categories: ICategory[] = [];
  public archiveStatus: Boolean[] = [];
  public statuses: String[] = []

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
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
