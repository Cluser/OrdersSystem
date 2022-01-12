import { IInquiry, IOrder, IProject, IUser } from ".";


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
    comment?: string;
    dateAndTime?: string;
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
    comment?: string;
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
    comment?: string;
    idProject?: number;
    idDistributor?: number;
    idUser?: number;
}