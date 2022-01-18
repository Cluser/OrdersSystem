import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service'
import { IClient, IProject, IProjectCreate } from '../../../shared/models';

@Component({
  selector: 'app-admin-modal-edit-project',
  templateUrl: './admin-modal-edit-project.component.html',
  styleUrls: ['./admin-modal-edit-project.component.scss']
})
export class AdminModalEditProjectComponent implements OnInit {

  @Output() projectEditedEvent: EventEmitter<any> = new EventEmitter();
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

  public editProject(project: IProject): void {
    this.api.project.editProject(project).subscribe(() => {
      this.projectEditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
