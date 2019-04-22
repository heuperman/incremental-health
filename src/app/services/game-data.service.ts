import { Injectable } from '@angular/core';
import { Factory } from '../interfaces/factory';
import { FactoryService } from './factory.service';
import { Upgrade } from '../interfaces/upgrade';
import { UpgradeService } from './upgrade.service';
import { GameData } from '../interfaces/game-data';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private stressReduction: number;
  private score: number;
  public baseStress = 1;

  private gameData: GameData;
  private defaultGameData: GameData = {
    score: 0,
    stressReduction: 0,
    hoursAvailable: 4,
    hoursWorkedPerFactory: [0, 0, 0, 0, 0],
    upgradesPurchased: [],
    stagesUnlocked: [],
    victoryAchieved: false
  };

  constructor(
    private factoryService: FactoryService,
    private upgradeService: UpgradeService
  ) { }

  getScore(): number {
    return this.gameData.score;
  }

  subtractFromScore(price: number) {
    this.score -= price;
  }

  reduceStress(amount: number) {
    this.gameData.stressReduction += amount;
  }

  getStress(): number {
    return this.baseStress - this.gameData.stressReduction;
  }

  getStressReduction(): number {
    return this.gameData.stressReduction;
  }

  getHoursWorked(factory: Factory): number {
    const index = this.factoryService.getFactoryIndex(factory);
    return this.gameData.hoursWorkedPerFactory[index];
  }

  updateHoursWorked(index: number, hours: number) {
    this.gameData.hoursWorkedPerFactory[index] += hours;
  }

  getUpgradesPurchased(): number[] {
    return this.gameData.upgradesPurchased;
  }

  addUpgradePurchased(upgrade: Upgrade) {
    this.gameData.upgradesPurchased.push(upgrade.id);
    this.upgradeService.removeFromAvailableUpgrades(upgrade);
  }

  getHoursAvailable(): number {
    return this.gameData.hoursAvailable - this.gameData.hoursWorkedPerFactory.reduce((a, b) => a + b);
  }

  getStagesUnlocked() {
    return this.gameData.stagesUnlocked;
  }

  isUnlocked(stageTitle: string): boolean {
    return this.gameData.stagesUnlocked.includes(stageTitle);
  }

  saveUnlock(stageTitle: string) {
    if (!this.gameData.stagesUnlocked.includes(stageTitle)) { this.gameData.stagesUnlocked.push(stageTitle); }
  }

  getGameData(): GameData {
    const loadedData: GameData = JSON.parse(localStorage.getItem('IncrementalHealthGameData'));
    this.gameData = loadedData ? loadedData : this.defaultGameData;
    return this.gameData;
  }

  saveGameData(gameData: GameData) {
    localStorage.setItem('IncrementalHealthGameData', JSON.stringify(gameData));
  }

  resetGameData() {
    this.gameData = this.defaultGameData;
  }
}
