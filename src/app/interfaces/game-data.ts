import {Upgrade} from './upgrade';

export interface GameData {
  score: number;
  stressReduction: number;
  hoursWorkedPerFactory: number[];
  upgradesPurchased: Upgrade[];
  stagesUnlocked: string[];
}
