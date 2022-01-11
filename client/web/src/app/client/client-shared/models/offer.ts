import { IDistributor, IItem, IUser } from ".";

export interface IPOffer {
    items: IOffer[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IOffer {
    id?: number;
    user?: IUser;
    distributor?: IDistributor;
    dateAndTime?: string;
    items?: IItem[];
}

export interface IOfferCreate {
    idUser?: number;
    idDistributor?: number;
    dateAndTime?: string;
}

export interface IOfferItemCreate {
    Item_id?: number;
    offer_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}
