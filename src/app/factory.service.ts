import { Injectable } from '@angular/core';
import {Factory} from './factory';

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
}