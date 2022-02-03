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
    email?: string;
    phone?: string;
    description?: string;
}