import {Upgrade} from './upgrade';

export interface GameData {
  score: number;
  stressReduction: number;
  factoriesPurchased: number[];
  upgradesPurchased: Upgrade[];
}
