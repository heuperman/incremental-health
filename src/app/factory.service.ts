import { Injectable } from '@angular/core';
import { Factory } from './factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  factories: Factory[] = [
    {title: 'dog walking', baseProduction: 1, basePrice: 1, requiredDestress: 10},
    {title: 'babysitting', baseProduction: 10, basePrice: 20, requiredDestress: 100},
    {title: 'take-away delivery', baseProduction: 100, basePrice: 400, requiredDestress: 1000},
    {title: 'uber driving', baseProduction: 1000, basePrice: 8000, requiredDestress: 1E5},
    {title: 'home baking', baseProduction: 1E4, basePrice: 16E4, requiredDestress: 1E6},
    {title: 'drop shipping', baseProduction: 1E5, basePrice: 32E5, requiredDestress: 1E7},
    {title: 'podcasting', baseProduction: 1E6, basePrice: 64E6, requiredDestress: 1E8},
    {title: 'crypto trading', baseProduction: 1E7, basePrice: 128E7, requiredDestress: 1E9},
    {title: 'self-publishing', baseProduction: 1E8, basePrice: 256E8, requiredDestress: 1E10},
    {title: 'angel investing', baseProduction: 1E9, basePrice: 612E9, requiredDestress: 1E11}
  ];

  getFactories(): Factory[] {
    return this.factories;
  }

  getFactory(title: string): Factory {
    return this.factories.find(factory => factory.title === title);
  }

  getPreviousStage(factory: Factory): Factory | undefined {
    const index = this.factories.indexOf(factory) - 1;
    return index >= 0 ? this.factories[index] : undefined;
  }

}
