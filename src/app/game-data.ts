import {Upgrade} from './upgrade';

export interface GameData {
  score: number;
  destress: number;
  factoriesPurchased: number[];
  upgradesPurchased: Upgrade[];
}
