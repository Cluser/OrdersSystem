import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-purchase-items-search',
  templateUrl: './purchase-items-search.component.html',
  styleUrls: ['./purchase-items-search.component.scss']
})
export class PurchaseItemsSearchComponent implements OnInit {

  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  public projects: any[] = [];
  public categories: any[] = [];
  public archiveStatus: any[] = [];
  public statuses: any[] = []


  public filters: any;
  public selectedProjects: any[] = [];
  public selectedCategories: any[] = [];
  public selectedStatuses: any[] = [];
  

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }

  public changeFilters(): void {

      let selectedProjects: any[] = [];
      let selectedCategories: any[] = [];
      let selectedArchiveStatus: any[] = [];

      this.selectedProjects.forEach((project) => { selectedProjects.push(project.id) })
      this.selectedCategories.forEach((category) => { selectedCategories.push(category.id) })
      this.archiveStatus.forEach((archiveStatus) => { selectedArchiveStatus.push(archiveStatus) })

      console.log(selectedArchiveStatus)
      this.filtersChanged.emit({archived: selectedArchiveStatus, 
                                idProject: selectedProjects,
                                idCategory: selectedCategories});
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
