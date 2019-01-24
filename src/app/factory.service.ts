import { Injectable } from '@angular/core';
import { Factory } from './factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  factories: Factory[] = [
    {title: 'first', baseProduction: 1, basePrice: 1},
    {title: 'second', baseProduction: 10, basePrice: 20},
    {title: 'third', baseProduction: 100, basePrice: 400},
    {title: 'fourth', baseProduction: 1000, basePrice: 8000},
    {title: 'fifth', baseProduction: 1E4, basePrice: 16E4},
    {title: 'sixth', baseProduction: 1E5, basePrice: 32E5},
    {title: 'seventh', baseProduction: 1E6, basePrice: 64E6},
    {title: 'eight', baseProduction: 1E7, basePrice: 128E7},
    {title: 'ninth', baseProduction: 1E8, basePrice: 256E8},
    {title: 'tenth', baseProduction: 1E9, basePrice: 612E9}
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
