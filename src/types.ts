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

export interface OrderData {
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: Record<string, number>;
}

export interface OrderT {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: Record<string, number>;
}