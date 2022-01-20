import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, ICategoryEdit, IPCategory } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Category {

  private apiUrl: string = environment.apiUrl;
  private categoriesEndpointUrl: string = this.apiUrl + '/Categories'


  constructor(private httpClient: HttpClient) { 
  }

  
  public getCategories(category?: ICategory, page?: number, size?: number): Observable<IPCategory> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(category)), {'page': page, 'size': size})

    return this.httpClient.get<IPCategory>(this.categoriesEndpointUrl, {params: params});
  }

  public addCategory(category?: ICategory): Observable<ICategory[]> {
    let params: any = {}

    if (category) { params = JSON.parse(JSON.stringify(category)) }

    return this.httpClient.post<ICategory[]>(this.categoriesEndpointUrl, params);
  }

  public editCategory(category: ICategory): Observable<ICategoryEdit> {
    let params: any = {}

    let categoryToEdit: ICategoryEdit = {
      id: category.id!,
      name: category.name
    };

    if (category) { params = JSON.parse(JSON.stringify(categoryToEdit)) }

    return this.httpClient.put<ICategoryEdit>(this.categoriesEndpointUrl, params);
  }
}