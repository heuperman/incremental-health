import { Injectable } from '@angular/core';
import { Upgrade } from './upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  upgrades = [
    {title: 'double first', target: 'first', multiplier: 2, price: 10, purchased: false, requiredLevel: 10},
    {title: 'double second', target: 'second', multiplier: 2, price: 200, purchased: false, requiredLevel: 10},
    {title: 'double third', target: 'third', multiplier: 2, price: 4000, purchased: false, requiredLevel: 10},
    {title: 'double fourth', target: 'fourth', multiplier: 2, price: 80000, purchased: false, requiredLevel: 10},
    {title: 'double fifth', target: 'fifth', multiplier: 2, price: 1600000, purchased: false, requiredLevel: 10},
  ];

  getUpgrades(): Upgrade[] {
    return this.upgrades;
  }

  getUpgrade(title: string): Upgrade {
    return this.upgrades.find(upgrade => upgrade.title === title);
  }

  setUpgradeToPurchased(title: string): void {
    this.getUpgrade(title).purchased = true;
  }

}
