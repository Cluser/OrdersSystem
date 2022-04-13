import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDistributor, IPDistributor } from "../../models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class Distributor {
  private apiUrl: string = environment.apiUrl;
  private distributorsEndpointUrl: string = this.apiUrl + "/Distributors";

  constructor(private httpClient: HttpClient) {}

  public getDistributors(distributor?: IDistributor, page?: number, size?: number): Observable<IPDistributor> {
    let params: any = {};
    params = Object.assign(JSON.parse(JSON.stringify(distributor)), { page: page, size: size });

    return this.httpClient.get<IPDistributor>(this.distributorsEndpointUrl, { params: params });
  }

  public addDistributors(distributor?: Partial<IDistributor>): Observable<IDistributor[]> {
    let params: any = {};

    if (distributor) {
      params = JSON.parse(JSON.stringify(distributor));
    }

    return this.httpClient.post<IDistributor[]>(this.distributorsEndpointUrl, params);
  }

  public editDistributor(distributor: Partial<IDistributor>): Observable<IDistributor> {
    let params: any = {};

    if (distributor) {
      params = JSON.parse(JSON.stringify(distributor));
    }

    return this.httpClient.put<IDistributor>(this.distributorsEndpointUrl, params);
  }
}
