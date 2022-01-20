import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ICategory, IDistributor, IItem, IProject } from '../../models';

@Component({
  selector: 'app-client-modal-edit-item',
  templateUrl: './client-modal-edit-item.component.html',
  styleUrls: ['./client-modal-edit-item.component.scss']
})
export class PurchaseModalEditItemComponent implements OnInit {

  @Output() itemEditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public item: IItem = {};
  public categories: ICategory[] = [];
  public projects: IProject[] = [];
  public distributors: IDistributor[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCategories();
    this.getProjects();
    this.getDistributors();
  }

  public getCategories(): void {
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }

  public getProjects(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public editItem(item: IItem): void {
    this.api.item.editItem(item).subscribe(() => {
      this.itemEditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
