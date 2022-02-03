import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service'
import { IClient, IProject } from '../../../shared/models';

@Component({
  selector: 'app-admin-modal-add-project',
  templateUrl: './admin-modal-add-project.component.html',
  styleUrls: ['./admin-modal-add-project.component.scss']
})
export class AdminModalAddProjectComponent implements OnInit {

  @Output() projectAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public project: IProject = {};
  public clients: IClient[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getClients();
  }

  public getClients(): void {
    this.api.client.getClients({}, 1, 1000).subscribe((clients) => this.clients = clients.items);
  }

  public addProject(project: IProject): void {
    project.idClient = 1;
    this.api.project.addProjects(project).subscribe(() => {
      this.projectAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
