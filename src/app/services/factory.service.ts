import { Injectable } from '@angular/core';
import { Factory } from '../interfaces/factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  factories: Factory[] = [
    {title: 'dog walking', baseProduction: 1, requiredStressReduction: 10},
    {title: 'babysitting', baseProduction: 10, requiredStressReduction: 100},
    {title: 'take-away delivery', baseProduction: 100, requiredStressReduction: 1000},
    {title: 'home baking', baseProduction: 1000, requiredStressReduction: 1E4},
    {title: 'crypto trading', baseProduction: 1E4, requiredStressReduction: 1E5},
  ];

  getFactories(): Factory[] {
    return this.factories;
  }

  getFactoryIndex(factory: Factory): number {
    return this.factories.indexOf(factory);
  }
}
