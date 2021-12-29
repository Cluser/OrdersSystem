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

export interface IItemToOrder {
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