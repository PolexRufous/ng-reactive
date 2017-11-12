import { Hero } from './hero';

export class Deal {
  id: string;
  seller: Hero;
  buyer: Hero;
  price: number;
  description: string;
  productType: string;
}
