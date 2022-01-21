import { IDistributor, IUser } from ".";

export interface IPOrder {
    items: IOrder[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IOrder {
    id?: number;
    user?: IUser;
    idDistributor?: number;
    distributor?: IDistributor;
    dateAndTime?: string;
    items?: IOrderItem[];
}

export interface IOrderCreate {
    idUser?: number;
    idDistributor?: number;
    dateAndTime?: string;
}

export interface IOrderItem {
    Item_id?: number;
    order_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}

export interface IOrderItemCreate {
    Item_id?: number;
    order_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}

