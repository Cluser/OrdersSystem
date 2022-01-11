import { Injectable } from '@angular/core';

import * as endpoint from './endpoints/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://127.0.0.1:8000'

  constructor(public client: endpoint.Client, public project: endpoint.Project, public item: endpoint.Item, public distributor: endpoint.Distributor, 
              public inquiry: endpoint.Inquiry, public offer: endpoint.Offer, public order: endpoint.Order,
              public inquiryItem: endpoint.InquiryItem, public offerItem: endpoint.OfferItem, public orderItem: endpoint.OrderItem) { 
  }

  
}


