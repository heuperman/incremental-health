import { Injectable } from '@angular/core';
import { Upgrade } from './upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  upgrades: Upgrade[] = [
    {title: 'double first', target: 'first', multiplier: 2, price: 50, requiredLevel: 10},
    {title: 'double second', target: 'second', multiplier: 2, price: 1000, requiredLevel: 10},
    {title: 'double third', target: 'third', multiplier: 2, price: 2E4, requiredLevel: 10},
    {title: 'double fourth', target: 'fourth', multiplier: 2, price: 4E5, requiredLevel: 10},
    {title: 'double fifth', target: 'fifth', multiplier: 2, price: 8E6, requiredLevel: 10},
    {title: 'double first again', target: 'first', multiplier: 2, price: 5000, requiredLevel: 25},
    {title: 'double second again', target: 'second', multiplier: 2, price: 1E5, requiredLevel: 25},
    {title: 'double third again', target: 'third', multiplier: 2, price: 2E6, requiredLevel: 25},
    {title: 'double fourth again', target: 'fourth', multiplier: 2, price: 4E7, requiredLevel: 25},
    {title: 'double fifth again', target: 'fifth', multiplier: 2, price: 8E8, requiredLevel: 25}
  ];
  availableUpgrades: Upgrade[] = [];

  constructor() { }

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
