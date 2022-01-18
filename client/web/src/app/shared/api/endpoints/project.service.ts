import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPProject, IProject, IProjectCreate } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Project {

  private apiUrl: string = environment.apiUrl;
  private projectsEndpointUrl: string = this.apiUrl + '/Projects'


  constructor(private httpClient: HttpClient) { 
  }

  
  public getProjects(project?: IProject, page?: number, size?: number): Observable<IPProject> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(project)), {'page': page, 'size': size})

    return this.httpClient.get<IPProject>(this.projectsEndpointUrl, {params: params});
  }

  public addProjects(project?: IProjectCreate): Observable<IProjectCreate[]> {
    let params: any = {}

    if (project) { params = JSON.parse(JSON.stringify(project)) }

    return this.httpClient.post<IProjectCreate[]>(this.projectsEndpointUrl, params);
  }
}