import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPProject, IProject, IStatistic } from "../../models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class Statistic {
  private apiUrl: string = environment.apiUrl;
  private statisticsEndpointUrl: string = this.apiUrl + "/Statistics";

  constructor(private httpClient: HttpClient) {}

  public getAllCosts(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/AllCosts");
  }

  public getAllOrderedItems(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/AllOrderedItems");
  }

  public getCostByUserReq(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByUserReq");
  }

  public getCostByUser(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByUser");
  }

  public getCostByProject(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByProject");
  }

  public getCostByDistributor(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByDistributor");
  }

  public getCostByContactPerson(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByContactPerson");
  }

  public getCostByCategory(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByCategory");
  }

  public getCostByClient(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByClient");
  }

  public getCostByProjectCategory(idProject?: number): Observable<IStatistic> {
    let params: any = {};
    params = Object.assign({ idProject: idProject });

    return this.httpClient.get<IStatistic>(this.statisticsEndpointUrl + "/ByProjectCategory", { params: params });
  }
}
