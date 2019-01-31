import { Injectable } from '@angular/core';
import { Upgrade } from './upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  upgrades: Upgrade[] = [
    {title: 'buy a kettle', id: 1, price: 10, requiredFunds: 5},
    {title: 'buy a bathtub', id: 2, price: 20, requiredFunds: 10},
    {title: 'double first', id: 5, target: 'first', multiplier: 2, price: 50, requiredLevel: 10},
    {title: 'double second', id: 6 , target: 'second', multiplier: 2, price: 1000, requiredLevel: 10},
    {title: 'double third', id: 7, target: 'third', multiplier: 2, price: 2E4, requiredLevel: 10},
    {title: 'double fourth', id: 8 , target: 'fourth', multiplier: 2, price: 4E5, requiredLevel: 10},
    {title: 'double fifth', id: 9 , target: 'fifth', multiplier: 2, price: 8E6, requiredLevel: 10},
    {title: 'double first again', id: 10 , target: 'first', multiplier: 2, price: 5000, requiredLevel: 25},
    {title: 'double second again', id: 11 , target: 'second', multiplier: 2, price: 1E5, requiredLevel: 25},
    {title: 'double third again', id: 12 , target: 'third', multiplier: 2, price: 2E6, requiredLevel: 25},
    {title: 'double fourth again', id: 13 , target: 'fourth', multiplier: 2, price: 4E7, requiredLevel: 25},
    {title: 'double fifth again', id: 14 , target: 'fifth', multiplier: 2, price: 8E8, requiredLevel: 25}
  ];
  availableUpgrades: Upgrade[] = [];

  getUpgrades(): Upgrade[] {
    return this.upgrades;
  }

  getAvailableUpgrades(): Upgrade[] {
    return this.availableUpgrades;
  }

  addToAvailableUpgrades(upgrade: Upgrade) {
    this.availableUpgrades.push(upgrade);
  }

  removeFromAvailableUpgrades(upgrade: Upgrade) {
    this.availableUpgrades.splice(this.availableUpgrades.indexOf(upgrade), 1);
  }
}
