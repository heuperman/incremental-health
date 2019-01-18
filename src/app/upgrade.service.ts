import { Injectable } from '@angular/core';
import { Upgrade } from './upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  upgrades = [
    {title: 'double first', target: 'first', multiplier: 2, price: 10, requiredLevel: 10},
    {title: 'double second', target: 'second', multiplier: 2, price: 200, requiredLevel: 10},
    {title: 'double third', target: 'third', multiplier: 2, price: 4000, requiredLevel: 10},
    {title: 'double fourth', target: 'fourth', multiplier: 2, price: 80000, requiredLevel: 10},
    {title: 'double fifth', target: 'fifth', multiplier: 2, price: 1600000, requiredLevel: 10},
    {title: 'double first', target: 'first', multiplier: 2, price: 1000, requiredLevel: 25},
    {title: 'double second', target: 'second', multiplier: 2, price: 2E4, requiredLevel: 25},
    {title: 'double third', target: 'third', multiplier: 2, price: 4E5, requiredLevel: 25},
    {title: 'double fourth', target: 'fourth', multiplier: 2, price: 8E6, requiredLevel: 25},
    {title: 'double fifth', target: 'fifth', multiplier: 2, price: 16E7, requiredLevel: 25}
  ];

  getUpgrades(): Upgrade[] {
    return this.upgrades;
  }

  getUpgrade(title: string): Upgrade {
    return this.upgrades.find(upgrade => upgrade.title === title);
  }

  setUpgradeToPurchased(title: string): void {
    this.upgrades.splice(this.upgrades.indexOf(this.getUpgrade(title)), 1);
  }

}
