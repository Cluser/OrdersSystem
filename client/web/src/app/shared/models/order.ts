import { IContactPerson, IDistributor, IUser } from ".";

export interface IPOrder {
  items?: IOrder[];
  previous_page?: number;
  next_page?: number;
  has_previous?: boolean;
  has_next?: boolean;
  total?: number;
  pages?: number;
}

export interface IOrder {
  id?: number;
  idUser?: number;
  user?: IUser;
  idDistributor?: number;
  distributor?: IDistributor;
  idContactPerson?: number;
  contactPerson?: IContactPerson;
  dateAndTime?: string;
  archived?: boolean;
  items?: IOrderItem[];
}

export interface IOrderItem {
  Item_id?: number;
  order_id?: number;
  quantity?: number;
  price?: number;
  currency?: string;
}
