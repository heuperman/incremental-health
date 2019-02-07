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
  private stress = 1E6;
  private destress = 0;
  private score = 0;
  private hoursAvailable = 4;
  private factoriesPurchased = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private upgradesPurchased = [0];

  constructor(private factoryService: FactoryService, private upgradeService: UpgradeService) { }

  startProduction() {
    setInterval(() => {
      this.score += this.calculateProduction() / 10;
      this.stress += this.calculateStressIncrease() / 10;
      this.checkAvailability();
    }, 100);
  }

  calculateProduction(): number {
    let upgradesToApply: Upgrade[];
    for (const upgradeId of this.upgradesPurchased) {
      upgradesToApply = this.upgradeService.getUpgrades().filter(upgrade => upgrade.id === upgradeId);
    }
    let production = 0;
    for (const factory of this.factoryService.getFactories()) {
      production += factory.baseProduction
        * this.getMultiplier(factory, upgradesToApply)
        * this.factoriesPurchased[this.factoryService.getFactories().indexOf(factory)];
    }
    return production;
  }

  calculateStressIncrease() {
    let stressIncrease = 0;
    for (const factory of this.factoryService.getFactories()) {
      stressIncrease += factory.baseProduction * this.factoriesPurchased[this.factoryService.getFactories().indexOf(factory)];
    }
    return stressIncrease;
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

  subtractFromScore(price: number) {
    this.score -= price;
  }

  getAmountPurchased(factory: Factory): number {
    const index = this.factoryService.getFactories().indexOf(factory);
    return this.factoriesPurchased[index] || 0;
  }

  updateHours(index: number, amount: number) {
    this.factoriesPurchased[index] += amount;
  }

  addUpgradePurchased(upgrade: Upgrade) {
    this.upgradesPurchased.push(upgrade.id);
    this.upgradeService.removeFromAvailableUpgrades(upgrade);
  }

  getPurchasedUpgrades() {
    return this.upgradesPurchased;
  }

  saveData() {
    const gameData = {
      score: this.score,
      destress: this.destress,
      factoriesPurchased: this.factoriesPurchased,
      upgradesPurchased: this.upgradesPurchased
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }

  loadData() {
    const loadedData = JSON.parse(localStorage.getItem('gameData'));
    if (loadedData) {
      this.score = loadedData.score;
      this.destress = loadedData.destress;
      this.factoriesPurchased = loadedData.factoriesPurchased;
      this.upgradesPurchased = loadedData.upgradesPurchased;
    }
  }

  checkAvailability() {
    for (const upgrade of this.upgradeService.getUpgrades()) {
      if (!this.upgradesPurchased.includes(upgrade.id)
        && this.score >= upgrade.requiredFunds
        && this.upgradeService.getAvailableUpgrades().filter(availableUpgrade => availableUpgrade === upgrade).length === 0) {
        this.upgradeService.addToAvailableUpgrades(upgrade);
      }
    }
  }

  reduceStress(amount: number) {
    this.destress += amount;
  }

  getStress() {
    return this.stress - this.destress;
  }

  getDestress() {
    return this.destress;
  }

  getHoursAvailable() {
    return this.hoursAvailable - this.factoriesPurchased.reduce((a, b) => a + b);
  }
}
