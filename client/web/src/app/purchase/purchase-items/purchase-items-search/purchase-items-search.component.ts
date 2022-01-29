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
  

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }

  public changeFilters(): void {

      let selectedProjects: any[] = [];
      let selectedCategories: any[] = [];
      let selectedArchiveStatus: any[] = [];

      this.projects.forEach((project) => { if (project.selected) selectedProjects.push(project.id) })
      this.categories.forEach((category) => { if (category.selected) selectedCategories.push(category.id) })
      this.archiveStatus.forEach((archiveStatus) => { selectedArchiveStatus.push(archiveStatus) })

      console.log(selectedArchiveStatus)
      this.filtersChanged.emit({archived: selectedArchiveStatus, 
                                idProject: selectedProjects,
                                idCategory: selectedCategories});
  }

}
