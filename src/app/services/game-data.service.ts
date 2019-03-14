import { Injectable } from '@angular/core';
import { Factory } from '../interfaces/factory';
import { FactoryService } from './factory.service';
import { Upgrade } from '../interfaces/upgrade';
import { UpgradeService } from './upgrade.service';
import { Multipliers } from '../interfaces/multipliers';
import { GameData } from '../interfaces/game-data';
import { VictoryDialogComponent } from '../victory-dialog/victory-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private hoursAvailable: number;
  private stressReduction: number;
  private score: number;
  private hoursWorkedPerFactory: number[];
  private upgradesPurchased: number[];
  private victoryAchieved: boolean;
  public stagesUnlocked: string[];
  public baseStress = 1E6;
  public burnout: boolean;

  constructor(
    private factoryService: FactoryService,
    private upgradeService: UpgradeService,
    public dialog: MatDialog) { }

  startProduction() {
    setInterval(() => {
      this.score += this.calculateProduction() / 10;
      this.stressReduction -= this.calculateStressIncrease() / 10;
      this.checkAvailability();
      this.checkBurnOut();
      this.checkVictory();
    }, 100);
  }

  calculateProduction(): number {
    let production = 0;
    for (const factory of this.factoryService.getFactories()) {
      const index = this.factoryService.getFactoryIndex(factory);
      production += factory.baseProduction
        * this.getMultiplier(index)
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

  getMultiplier(factoryIndex: number): number {
    const upgradesToApply: Upgrade[] = [];
    for (const upgradeId of this.upgradesPurchased) {
      upgradesToApply.push(this.upgradeService.getUpgrades().find(upgrade => upgrade.id === upgradeId));
    }
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
    return this.hoursWorkedPerFactory[index];
  }

  updateHoursWorked(index: number, hours: number) {
    this.hoursWorkedPerFactory[index] += hours;
  }

  addUpgradePurchased(upgrade: Upgrade) {
    this.upgradesPurchased.push(upgrade.id);
    this.upgradeService.removeFromAvailableUpgrades(upgrade);
  }

  getPurchasedUpgrades(): number[] {
    return this.upgradesPurchased;
  }

  saveData() {
    const gameData: GameData = {
      score: this.score,
      stressReduction: this.stressReduction,
      hoursAvailable: this.hoursAvailable,
      hoursWorkedPerFactory: this.hoursWorkedPerFactory,
      upgradesPurchased: this.upgradesPurchased,
      stagesUnlocked: this.stagesUnlocked,
      victoryAchieved: this.victoryAchieved
    };
     localStorage.setItem('gameData', JSON.stringify(gameData));
  }

  loadData() {
    const loadedData: GameData = JSON.parse(localStorage.getItem('gameData'));
    if (loadedData) {
      this.score = loadedData.score;
      this.stressReduction = loadedData.stressReduction;
      this.hoursAvailable = loadedData.hoursAvailable;
      this.hoursWorkedPerFactory = loadedData.hoursWorkedPerFactory;
      this.upgradesPurchased = loadedData.upgradesPurchased;
      this.stagesUnlocked = loadedData.stagesUnlocked;
      this.victoryAchieved = loadedData.victoryAchieved;
    } else {
      this.applyDefaultData();
    }
  }

  applyDefaultData() {
    this.score = 0;
    this.stressReduction = 0;
    this.hoursAvailable = 4;
    this.hoursWorkedPerFactory = [];
    this.factoryService.getFactories().forEach(() => {
      this.hoursWorkedPerFactory.push(0);
    });
    this.upgradesPurchased = [];
    this.stagesUnlocked = [];
    this.victoryAchieved = false;
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

  checkBurnOut() {
    if (this.burnout) {
      for (const factory of this.factoryService.getFactories()) {
        const index = this.factoryService.getFactoryIndex(factory);
        const hours = this.hoursWorkedPerFactory[index];
        this.updateHoursWorked(index, -hours);
      }
    }
  }

  checkVictory() {
    if (this.stressReduction >= this.baseStress && !this.victoryAchieved) {
      const dialogRef = this.dialog.open(VictoryDialogComponent, {
        height: 'auto',
        width: 'auto',
        autoFocus: false
      });
      this.victoryAchieved = true;

      dialogRef.afterClosed().subscribe(reset => {
        if (reset) { this.applyDefaultData(); }
        this.victoryAchieved = !reset;
      });
    }
  }
}
