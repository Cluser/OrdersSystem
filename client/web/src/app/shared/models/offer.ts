import { IContactPerson, IDistributor, IItem, IUser } from ".";

export interface IPOffer {
    items?: IOffer[];
    previous_page?: number;
    next_page?: number;
    has_previous?: boolean;
    has_next?: boolean;
    total?: number;
    pages?: number;
}

export interface IOffer {
    id?: number;
    idUser?: number;
    user?: IUser;
    idDistributor?: number;
    distributor?: IDistributor;
    idContactPerson?: number;
    contactPerson?: IContactPerson;
    dateAndTime?: string;
    archived?: boolean;
    totalPrice?: number;
    items?: IOfferItem[];
}

export interface IOfferItem {
    Item_id?: number;
    offer_id?: number;
    quantity?: number;
    price?: number;
    currency?: string;
}
