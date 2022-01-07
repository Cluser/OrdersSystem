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
    quantity?: number;
    status?: string;
    idProject?: number;
    idDistributor?: number;
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
    inquiriedBy?: string;
    items?: IItem[];
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
    orderedBy?: string;
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
