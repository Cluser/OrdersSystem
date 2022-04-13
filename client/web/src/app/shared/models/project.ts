import { IClient } from ".";

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
  Client?: IClient;
}
