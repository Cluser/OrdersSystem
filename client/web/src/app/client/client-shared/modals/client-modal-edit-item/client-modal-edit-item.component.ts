import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { IDistributor, IItem, IItemCreate, IItemEdit, IProject } from '../../models/models';

@Component({
  selector: 'app-client-modal-edit-item',
  templateUrl: './client-modal-edit-item.component.html',
  styleUrls: ['./client-modal-edit-item.component.scss']
})
export class ClientModalEditItemComponent implements OnInit {

  @Output() itemEdited: EventEmitter<any> = new EventEmitter();

  public item: IItem = {};
  public projects: IProject[] = [];
  public distributors: IDistributor[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProjects();
    this.getDistributors();
  }

  public getProjects(): void {
    this.api.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
  }

  public getDistributors(): void {
    this.api.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public editItem(item: IItem): void {
    this.api.editItem(item).subscribe(() => this.close());
  }

  public close(): void {
    this.itemEdited.emit();
  }

}
