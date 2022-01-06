export interface IClient {
    id?: number;
    name?: string;
    address?: string;
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

export interface IItemReq {
    Item: IItem;
    page: number;
    size: number;
}


export interface IItem {
    id?: number;
    name?: string;
    quantity?: number;
    status?: string;
    idProject?: number;
    idDistributor?: number;
}

export interface IDistributor {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
}