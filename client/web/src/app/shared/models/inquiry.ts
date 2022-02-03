import { IContactPerson, IDistributor, IItem, IUser } from ".";

export interface IPInquiry {
    items: IInquiry[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IInquiry {
    id?: number;
    idUser?: number;
    user?: IUser;
    idDistributor?: number;
    distributor?: IDistributor;
    idContactPerson?: number;
    contactPerson?: IContactPerson;
    dateAndTime?: string;
    archived?: boolean;
    items?: IItem[];
}

export interface IInquiryItem {
    Item_id?: number;
    inquiry_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}