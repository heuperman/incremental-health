import { Injectable } from '@angular/core';
import { Upgrade } from '../interfaces/upgrade';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  upgrades: Upgrade[] = [
    {title: 'tea set', description: 'get all you need for a nice cup of tea', id: 1, price: 10, requiredFunds: 5},
    {title: 'bathtub', description: 'have a freestanding bathtub installed', id: 2, price: 100, requiredFunds: 50},
    {title: 'massage therapist', description: 'hire strong hands to kneed out the tension', id: 3, price: 1000, requiredFunds: 500},
    {title: 'pet', description: 'adopt a lovable creature', id: 4, price: 1E4, requiredFunds: 5000},
    {title: 'spa membership', description: 'sign up for your local pamper palace', id: 5, price: 1E5, requiredFunds: 5E4},
    {title: 'more leashes', description: 'double income from dog walking', id: 6, target: 0, price: 50, requiredFunds: 25},
    {title: 'twins only policy', description: 'double income from babysitting', id: 7 , target: 1, price: 500, requiredFunds: 250},
    {title: 'electric bike', description: 'double income from take-away delivery', id: 8, target: 2, price: 5000, requiredFunds: 2500},
    {title: 'dual ovens', description: 'double income from home baking', id: 9, target: 3, price: 5E4, requiredFunds: 25000},
    {title: 'trading bots', description: 'double income from crypto trading', id: 10, target: 4, price: 5E5, requiredFunds: 25E4},
    {title: 'material goods', description: 'buy all the shiny things you ever wanted', id: 11, price: 5E6, requiredFunds: 25E5}
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
