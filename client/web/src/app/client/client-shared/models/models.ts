export interface IPClient {
    items: IClient[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}


export interface IClient {
    id?: number;
    name?: string;
    address?: string;
}

export interface IPProject {
    items: IProject[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IProject {
    id?: number;
    name?: string;
    idClient?: number;
}

export interface IPItem {
    items: IItem[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IItem {
    id?: number;
    name?: string;
    category?: string;
    quantity?: number;
    status?: string;
    idProject?: number;
    idUser?: number;
    user?: IUser;
    project?: IProject;
    inquiries?: IInquiry[];
    orders?: IOrder[];
}

export interface IItemCreate {
    name?: string;
    category?: string;
    quantity?: number;
    status?: string;
    idProject?: number;
    idDistributor?: number;
    idUser?: number;
}

export interface IItemEdit {
    id: number;
    name?: string;
    category?: string;
    quantity?: number;
    status?: string;
    idProject?: number;
    idDistributor?: number;
    idUser?: number;
}

export interface IPDistributor {
    items: IDistributor[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IDistributor {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    description?: string
}

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
    distributor?: IDistributor;
    dateAndTime?: string;
    items?: IItem[];
}


export interface IPUser {
    items: IUser[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IUser {
    id?: number;
    name?: string;
    surname?: string;
}

export interface IInquiryItemCreate {
    Item_id?: number;
    inquiry_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}

export interface IOfferItemCreate {
    Item_id?: number;
    offer_id?: number;
    quantity?: number;
    price?: number;
    status?: string;
}

