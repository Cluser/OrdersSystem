import { IDistributor, IItem } from ".";

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
    user?: string;
    distributor?: IDistributor;
    dateAndTime?: string;
    items?: IItem[];
}

export interface IInquiryCreate {
    idUser?: number;
    idDistributor?: number;
    dateAndTime?: string;
}

export interface IInquiryItemCreate {
    Item_id?: number;
    inquiry_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}