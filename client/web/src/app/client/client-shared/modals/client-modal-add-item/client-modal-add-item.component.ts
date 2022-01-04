import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { IDistributor, IItem, IProject } from '../../models/models';

@Component({
  selector: 'app-client-modal-add-item',
  templateUrl: './client-modal-add-item.component.html',
  styleUrls: ['./client-modal-add-item.component.scss']
})
export class ClientModalAddItemComponent implements OnInit {

  @Output() itemAdded: EventEmitter<any> = new EventEmitter();

  public item: IItem = {};
  public projects: IProject[] = [];
  public distributors: IDistributor[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProjects();
    this.getDistributors();
  }

  public getProjects(): void {
    this.api.getProjects().subscribe((projects) => this.projects = projects);
  }

  public getDistributors(): void {
    this.api.getDistributors().subscribe((distributors) => this.distributors = distributors);
  }

  public addItem(item: IItem): void {
    this.api.addItems(item).subscribe(() => this.close());
  }

  public close(): void {
    this.itemAdded.emit();
  }

}
