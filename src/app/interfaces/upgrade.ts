export interface Upgrade {
  title: string;
  description: string;
  id: number;
  price: number;
  target?: number;
  requiredFunds?: number;
}
