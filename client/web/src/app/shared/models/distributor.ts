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
    email?: string
    description?: string
}

export interface IDistributorCreate {
    name?: string;
    address?: string;
    phone?: string;
    email?: string
    description?: string
}