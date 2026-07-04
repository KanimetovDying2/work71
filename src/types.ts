export interface DishT {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface DishTMutation {
  title: string;
  price: string | number;
  image: string;
}

export interface Order {}
