import { Injectable } from '@angular/core';
import { Factory } from './factory';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() { }

  factories: Factory[] = [
    {title: 'first', production: 1, price: 1, purchased: 0},
    {title: 'second', production: 10, price: 20, purchased: 0},
    {title: 'third', production: 100, price: 400, purchased: 0},
    {title: 'fourth', production: 1000, price: 8000, purchased: 0},
    {title: 'fifth', production: 1E4, price: 16E4, purchased: 0},
    {title: 'sixth', production: 1E5, price: 32E5, purchased: 0},
    {title: 'seventh', production: 1E6, price: 64E6, purchased: 0},
    {title: 'eight', production: 1E7, price: 128E7, purchased: 0},
    {title: 'ninth', production: 1E8, price: 256E8, purchased: 0},
    {title: 'tenth', production: 1E9, price: 612E9, purchased: 0}
  ];

  getFactories(): Factory[] {
    return this.factories;
  }

  getFactory(title: string): Factory {
    return this.factories.find(factory => factory.title === title);
  }

  increasePrice(title: string): void {
    this.getFactory(title).price *= 1.3;
  }

  multiplyProduction(target: string, multiplier: number): void {
    this.getFactory(target).production *= multiplier;
  }

  recordPurchase(title: string): void {
    this.increasePrice(title);
    this.getFactory(title).purchased++;
  }

  getPreviousStage(title: string): Factory | undefined {
    const index = this.factories.indexOf(this.getFactory(title)) - 1;
    return index >= 0 ? this.factories[index] : undefined;
  }

}
