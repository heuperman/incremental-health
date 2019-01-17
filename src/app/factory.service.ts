import { Injectable } from '@angular/core';
import { Factory } from './factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  factories = [
    {title: 'first', production: 1, price: 1, purchased: 0},
    {title: 'second', production: 10, price: 20, purchased: 0},
    {title: 'third', production: 100, price: 400, purchased: 0},
    {title: 'fourth', production: 1000, price: 8000, purchased: 0},
    {title: 'fifth', production: 10000, price: 160000, purchased: 0}
  ];

  getFactories(): Factory[] {
    return this.factories;
  }

  getFactory(target: string): Factory {
    return this.factories.find(factory => factory.title === target);
  }

  increasePrice(target: string): void {
    this.getFactory(target).price *= 1.3;
  }

  multiplyProduction(target: string, multiplier: number): void {
    this.getFactory(target).production *= multiplier;
  }

  recordPurchase(target: string): void {
    this.increasePrice(target);
    this.getFactory(target).purchased++;
  }

}
