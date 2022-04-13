import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory, IPCategory } from "../../models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class Category {
  private apiUrl: string = environment.apiUrl;
  private categoriesEndpointUrl: string = this.apiUrl + "/Categories";

  constructor(private httpClient: HttpClient) {}

  public getCategories(category?: ICategory, page?: number, size?: number): Observable<IPCategory> {
    let params: any = {};
    params = Object.assign(JSON.parse(JSON.stringify(category)), { page: page, size: size });

    return this.httpClient.get<IPCategory>(this.categoriesEndpointUrl, { params: params, withCredentials: true });
  }

  public addCategory(category?: Partial<ICategory>): Observable<ICategory[]> {
    let params: any = {};

    if (category) {
      params = JSON.parse(JSON.stringify(category));
    }

    return this.httpClient.post<ICategory[]>(this.categoriesEndpointUrl, params);
  }

  public editCategory(category: Partial<ICategory>): Observable<ICategory> {
    let params: any = {};

    if (category) {
      params = JSON.parse(JSON.stringify(category));
    }

    return this.httpClient.put<ICategory>(this.categoriesEndpointUrl, params);
  }
}
