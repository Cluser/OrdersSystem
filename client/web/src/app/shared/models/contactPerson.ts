import { IDistributor } from "."

export interface IPContactPerson {
    items: IContactPerson[];
    previous_page: number;
    next_page: number;
    has_previous: boolean;
    has_next: boolean;
    total: number;
    pages: number;
}

export interface IContactPerson {
    id?: number;
    name?: string;
    phone?: string;
    email?: string;
    description?: string;
    idDistributor?: number;
    distributor?: IDistributor;
}

export interface IContactPersonCreate {
    name?: string;
    phone?: string;
    email?: string;
    description?: string;
    idDistributor?: number;
}

export interface IContactPersonEdit {
    id?: number;
    name?: string;
    phone?: string;
    email?: string;
    description?: string;
    idDistributor?: number;
}

