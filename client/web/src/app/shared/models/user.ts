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
  email?: string;
  password?: string;
}
