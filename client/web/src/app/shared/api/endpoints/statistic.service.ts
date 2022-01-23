import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPProject, IProject, IStatistic } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Statistic {

    private apiUrl: string = environment.apiUrl;
    private statisticsEndpointUrl: string = this.apiUrl + '/Statistics'


    constructor(private httpClient: HttpClient) { 
    }

  
    public getCostByProject(): Observable<IStatistic> {
        return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl);
    }

    public getCostByProjectCategory(): Observable<IStatistic> {
      return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + 'ByProjectCategory');
    }

}