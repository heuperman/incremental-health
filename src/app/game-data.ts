import {Upgrade} from './upgrade';

export interface GameData {
  score: number;
  factoriesPurchased: number[];
  upgradesPurchased: Upgrade[];
}
