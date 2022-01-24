import { ICategory, IInquiry, IOrder, IProject, IUser } from ".";


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
    model?: string;
    quantity?: number;
    status?: string;
    comment?: string;
    archived?: boolean;
    dateAndTime?: string;
    idCategory?: number;
    idProject?: number;
    idUser?: number;
    category?: ICategory;
    user?: IUser;
    project?: IProject;
    inquiries?: IInquiry[];
    orders?: IOrder[];
}

export interface IItemCreate {
    name?: string;
    model?: string;
    quantity?: number;
    status?: string;
    comment?: string;
    archived?: boolean;
    idCategory?: number;
    idProject?: number;
    idDistributor?: number;
    idUser?: number;
}

export interface IItemEdit {
    id: number;
    name?: string;
    model?: string;
    quantity?: number;
    status?: string;
    comment?: string;
    archived?: boolean;
    idCategory?: number;
    idProject?: number;
    idDistributor?: number;
    idUser?: number;
}