export interface Upgrade {
  title: string;
  id: number;
  price: number;
  target?: string;
  multiplier?: number;
  requiredLevel?: number;
  requiredFunds?: number;
}
