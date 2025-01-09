export interface Product {
    _id: string;
    name: string;
    price: number;
    status: number;
    category: string;
    wareHouse: string;
    count: number;
    image: string;
    discount?: number;
  }