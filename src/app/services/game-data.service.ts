import { Injectable } from '@angular/core';
import { Factory } from '../interfaces/factory';
import { FactoryService } from './factory.service';
import { Upgrade } from '../interfaces/upgrade';
import { UpgradeService } from './upgrade.service';
import { Multipliers } from '../interfaces/multipliers';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private baseStress = 1E6;
  private stressReduction = 0;
  private score = 0;
  private hoursAvailable = 4;
  private hoursWorkedPerFactory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private upgradesPurchased = [];
  private stagesUnlocked = [];

  constructor(private factoryService: FactoryService, private upgradeService: UpgradeService) { }

  startProduction() {
    setInterval(() => {
      this.score += this.calculateProduction() / 10;
      this.stressReduction -= this.calculateStressIncrease() / 10;
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
      const index = this.factoryService.getFactoryIndex(factory);
      production += factory.baseProduction
        * this.getMultiplier(index, upgradesToApply)
        * this.hoursWorkedPerFactory[index];
    }
    return production;
  }

  calculateStressIncrease() {
    let stressIncrease = 0;
    for (const factory of this.factoryService.getFactories()) {
      stressIncrease += factory.baseProduction * this.hoursWorkedPerFactory[this.factoryService.getFactoryIndex(factory)];
    }
    return stressIncrease;
  }

  getMultiplier(factoryIndex: number, upgradesToApply: Upgrade[]): number {
    const upgrades = upgradesToApply ? upgradesToApply.filter(upgrade => upgrade.target === factoryIndex) : [];
    return Multipliers.base * (upgrades.length * 2) || Multipliers.base;
  }

  getScore(): number {
    return this.score;
  }

  subtractFromScore(price: number) {
    this.score -= price;
  }

  getHoursWorked(factory: Factory): number {
    const index = this.factoryService.getFactoryIndex(factory);
    return this.hoursWorkedPerFactory[index] || 0;
  }

  updateHoursWorked(index: number, hours: number) {
    this.hoursWorkedPerFactory[index] += hours;
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
      stressReduction: this.stressReduction,
      hoursWorkedPerFactory: this.hoursWorkedPerFactory,
      upgradesPurchased: this.upgradesPurchased
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }

  loadData() {
    const loadedData = JSON.parse(localStorage.getItem('gameData'));
    if (loadedData) {
      this.score = loadedData.score;
      this.stressReduction = loadedData.stressReduction;
      this.hoursWorkedPerFactory = loadedData.hoursWorkedPerFactory;
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
    this.stressReduction += amount;
  }

  getStress(): number {
    return this.baseStress - this.stressReduction;
  }

  getStressReduction(): number {
    return this.stressReduction;
  }

  getHoursAvailable(): number {
    return this.hoursAvailable - this.hoursWorkedPerFactory.reduce((a, b) => a + b);
  }

  previouslyUnlocked(title: string): boolean {
    return this.stagesUnlocked.includes(title);
  }

  saveUnlock(title: string) {
    if (!this.stagesUnlocked.includes(title)) { this.stagesUnlocked.push(title); }
  }
}
