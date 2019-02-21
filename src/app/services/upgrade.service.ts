import { Injectable } from '@angular/core';
import { Upgrade } from '../interfaces/upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  upgrades: Upgrade[] = [
    {title: 'buy a kettle', description: 'unlock self-care level 2', id: 1, price: 10, requiredFunds: 5},
    {title: 'buy a bathtub', description: 'unlock self-care level 3', id: 2, price: 100, requiredFunds: 50},
    {title: 'hire  a massage therapist', description: 'unlock self-care level 4', id: 3, price: 1000, requiredFunds: 500},
    {title: 'sign up for the local spa', description: 'unlock self-care level 5', id: 4, price: 1E5, requiredFunds: 5000},
    {title: 'more leashes', description: 'double income from dog walking', id: 5, target: 0, price: 50, requiredFunds: 25},
    {title: 'target richer parents', description: 'double income from babysitting', id: 6 , target: 1, price: 500, requiredFunds: 250},
    {title: 'get an e-bike', description: 'double income from take-away delivery', id: 7, target: 2, price: 5000, requiredFunds: 2500},
    {title: 'drive a luxury car', description: 'double income from uber driving', id: 8, target: 3, price: 5E4, requiredFunds: 25000},
    {title: 'install twin ovens', description: 'double income from home baking', id: 9, target: 4, price: 5E5, requiredFunds: 25E4}
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
