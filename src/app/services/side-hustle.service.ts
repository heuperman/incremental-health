import { Injectable } from '@angular/core';
import { SideHustle } from '../interfaces/sideHustle';

@Injectable({
  providedIn: 'root'
})
export class SideHustleService {

  constructor() { }

  sideHustles: SideHustle[] = [
    {title: 'dog walking', baseProduction: 1, requiredStressReduction: 5},
    {title: 'babysitting', baseProduction: 10, requiredStressReduction: 100},
    {title: 'take-away delivery', baseProduction: 100, requiredStressReduction: 1000},
    {title: 'home baking', baseProduction: 1000, requiredStressReduction: 1E4},
    {title: 'crypto trading', baseProduction: 1E4, requiredStressReduction: 1E5},
  ];

  getSideHustles(): SideHustle[] {
    return this.sideHustles;
  }

  getSideHustleIndex(sideHustle: SideHustle): number {
    return this.sideHustles.indexOf(sideHustle);
  }
}
