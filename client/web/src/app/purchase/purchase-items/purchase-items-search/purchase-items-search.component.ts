import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { ICategory, IProject } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-items-search',
  templateUrl: './purchase-items-search.component.html',
  styleUrls: ['./purchase-items-search.component.scss']
})
export class PurchaseItemsSearchComponent implements OnInit {

  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  public projects: any[] = [];
  public categories: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }

  public changeFilters(): void {
    this.filtersChanged.emit({archived: true});
  }

  public changeFilters2(): void {
    this.filtersChanged.emit({archived: false});
  }

  public changeFilters3(): void {
    this.filtersChanged.emit({});
  }

  public changeFilters4(): void {
    this.projects.forEach((project) => {
      if (project.selected) {
        this.filtersChanged.emit({idProject: project.id, idCategory: this.categories[0].id});
      }

    })

  }

}
