import { Injectable } from '@angular/core';
import {Factory} from './factory';
import {FactoryService} from './factory.service';
import {GameData} from './game-data';
import {Upgrade} from './upgrade';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  gameData: GameData = {
    score: 0,
    factoriesPurchased: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    upgradesPurchased: []
  };
  production: number;
  intervalId: number;

  constructor(private factoryService: FactoryService) { }

  getAmountPurchased(factory: Factory): number {
    const index = this.factoryService.getFactories().indexOf(factory);
    return this.gameData.factoriesPurchased[index] || 0;
  }

  getPrice(factory: Factory): number {
    const index = this.factoryService.getFactories().indexOf(factory);
    return this.gameData.factoriesPurchased[index] * 1.3 * factory.basePrice || factory.basePrice;

  }

  recordFactoryPurchase(factory: Factory, amount: number): void  {
    this.subtractFromScore(this.getPrice(factory) * amount);
    this.addPurchaseToData(factory, amount);
    this.updateProduction();
  }

  recordUpgradePurchase(upgrade: Upgrade): void {
    this.subtractFromScore(upgrade.price);
    this.addUpgradeToData(upgrade);
    this.updateProduction();
  }

  saveData(): void {
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  loadData(): void {
    const loadedData = JSON.parse(localStorage.getItem('gameData'));
    if (loadedData) {
      this.gameData.score = loadedData.score;
      this.gameData.factoriesPurchased = loadedData.factoriesPurchased;
    }
  }

  getScore(): number {
    return this.gameData.score;
  }

  addToScore(amount: number) {
    this.gameData.score += amount;
  }

  subtractFromScore(price: number) {
    this.gameData.score -= price;
  }

  addPurchaseToData(factory: Factory, amount: number) {
    const index = this.factoryService.getFactories().indexOf(factory);
    this.gameData.factoriesPurchased[index] += amount;
  }

  addUpgradeToData(upgrade: Upgrade) {
    this.gameData.upgradesPurchased.push(upgrade);
  }

  updateProduction() {
    clearInterval(this.intervalId);
    this.production = this.getProduction();
    this.intervalId = setInterval(() => this.addToScore(this.production / 10), 100);
  }

  getProduction(): number {
    let totalProduction = 0;
    for (const factory of this.factoryService.getFactories()) {
      totalProduction += factory.baseProduction * this.getAmountPurchased(factory);
    }
    return totalProduction;
  }

}
