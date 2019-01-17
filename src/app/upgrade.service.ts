import { Injectable } from '@angular/core';
import { Upgrade } from './upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  upgrades = [
    {title: 'double first', target: 0, multiplier: 2, price: 10, purchased: false, requiredLevel: 10},
    {title: 'double second', target: 1, multiplier: 2, price: 200, purchased: false, requiredLevel: 10},
    {title: 'double third', target: 2, multiplier: 2, price: 4000, purchased: false, requiredLevel: 10},
    {title: 'double fourth', target: 3, multiplier: 2, price: 80000, purchased: false, requiredLevel: 10},
    {title: 'double fifth', target: 4, multiplier: 2, price: 1600000, purchased: false, requiredLevel: 10},
    {title: 'double first', target: 0, multiplier: 2, price: 1000, purchased: false, requiredLevel: 25},
    {title: 'double second', target: 1, multiplier: 2, price: 20000, purchased: false, requiredLevel: 25},
    {title: 'double third', target: 2, multiplier: 2, price: 400000, purchased: false, requiredLevel: 25},
    {title: 'double fourth', target: 3, multiplier: 2, price: 8000000, purchased: false, requiredLevel: 25},
    {title: 'double fifth', target: 4, multiplier: 2, price: 160000000, purchased: false, requiredLevel: 25}
  ];

  getUpgrades(): Upgrade[] {
    return this.upgrades;
  }
}
