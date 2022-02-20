import { Injectable } from '@angular/core';

import * as endpoint from './endpoints/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public client: endpoint.Client, public project: endpoint.Project, public item: endpoint.Item, public distributor: endpoint.Distributor, 
              public inquiry: endpoint.Inquiry, public offer: endpoint.Offer, public order: endpoint.Order,
              public inquiryItem: endpoint.InquiryItem, public offerItem: endpoint.OfferItem, public orderItem: endpoint.OrderItem,
              public category: endpoint.Category, public contactPerson: endpoint.ContactPerson, public statistic: endpoint.Statistic,
              public authenticate: endpoint.Authenticate, public user: endpoint.User) { 
  }

  
}


