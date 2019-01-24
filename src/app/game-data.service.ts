import { Injectable } from '@angular/core';
import { Factory } from './factory';
import { FactoryService } from './factory.service';
import { Upgrade } from './upgrade';
import { UpgradeService } from './upgrade.service';
import { Multipliers } from './multipliers';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private score = 0;
  private factoriesPurchased = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private upgradesPurchased = [];

  constructor(private factoryService: FactoryService, private upgradeService: UpgradeService) {}

  startProduction() {
    setInterval(() => this.score += this.calculateProduction() / 10, 100);
  }

  calculateProduction(): number {
    let upgradesToApply: Upgrade[];
    for (const upgradeTitle of this.upgradesPurchased) {
      upgradesToApply = this.upgradeService.getUpgrades().filter(upgrade => upgrade.title === upgradeTitle);
    }
    let production = 0;
    for (const factory of this.factoryService.getFactories()) {
      production += factory.baseProduction
        * this.getMultiplier(factory, upgradesToApply)
        * this.factoriesPurchased[this.factoryService.getFactories().indexOf(factory)];
    }
    return production;
  }

  getMultiplier(factory: Factory, upgradesToApply: Upgrade[]): number {
    let totalMultiplier = Multipliers.base;
    const upgrades =  upgradesToApply ? upgradesToApply.filter(upgrade => upgrade.target === factory.title) : [];
    for (const upgrade of upgrades) {
      totalMultiplier *= upgrade.multiplier;
    }
    return totalMultiplier;
  }

  getScore(): number {
    return this.score;
  }

  addToScore(amount: number) {
    this.score += amount;
  }

  subtractFromScore(price: number) {
    this.score -= price;
  }

  getAmountPurchased(factory: Factory): number {
    const index = this.factoryService.getFactories().indexOf(factory);
    return this.factoriesPurchased[index] || 0;
  }

  addAmountPurchased(factory: Factory, amount: number) {
    const index = this.factoryService.getFactories().indexOf(factory);
    this.factoriesPurchased[index] += amount;
    this.checkAvailability();
  }

  addUpgradePurchased(upgrade: Upgrade) {
    this.upgradesPurchased.push(upgrade.title);
    this.upgradeService.removeFromAvailableUpgrades(upgrade);
  }

  saveData() {
    const gameData = {
      score: this.score,
      factoriesPurchased: this.factoriesPurchased,
      upgradesPurchased: this.upgradesPurchased
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }

  loadData() {
    const loadedData = JSON.parse(localStorage.getItem('gameData'));
    if (loadedData) {
      this.score = loadedData.score;
      this.factoriesPurchased = loadedData.factoriesPurchased;
      this.upgradesPurchased = loadedData.upgradesPurchased;
    }
  }

  checkAvailability() {
    for (const upgrade of this.upgradeService.getUpgrades()) {
      const factory = this.factoryService.getFactory(upgrade.target);
      if (!this.upgradesPurchased.includes(upgrade.title)
        && this.getAmountPurchased(factory) >= upgrade.requiredLevel
        && this.upgradeService.getAvailableUpgrades().filter(availableUpgrade => availableUpgrade === upgrade).length === 0) {
        this.upgradeService.addToAvailableUpgrades(upgrade);
      }
    }
  }

}
