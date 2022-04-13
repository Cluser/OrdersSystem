export interface IPCategory {
  items: ICategory[];
  previous_page: number;
  next_page: number;
  has_previous: boolean;
  has_next: boolean;
  total: number;
  pages: number;
}

export interface ICategory {
  id?: number;
  name?: string;
}
