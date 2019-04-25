import { Injectable } from '@angular/core';
import { SideHustle } from '../interfaces/sideHustle';
import { SideHustleService } from './side-hustle.service';
import { Upgrade } from '../interfaces/upgrade';
import { UpgradeService } from './upgrade.service';
import { GameData } from '../interfaces/game-data';
import { defaultValues } from '../defaultValues';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private gameData: GameData;

  constructor(
    private sideHustleService: SideHustleService,
    private upgradeService: UpgradeService
  ) { }

  getScore(): number {
    return this.gameData.score;
  }

  subtractFromScore(price: number) {
    this.gameData.score -= price;
  }

  reduceStress(amount: number) {
    this.gameData.stressReduction += amount;
  }

  getStress(): number {
    return defaultValues.baseStress - this.gameData.stressReduction;
  }

  getStressReduction(): number {
    return this.gameData.stressReduction;
  }

  getHoursWorked(sideHustle: SideHustle): number {
    const index = this.sideHustleService.getSideHustleIndex(sideHustle);
    return this.gameData.hoursWorkedPerSideHustle[index];
  }

  updateHoursWorked(index: number, hours: number) {
    this.gameData.hoursWorkedPerSideHustle[index] += hours;
  }

  getUpgradesPurchased(): number[] {
    return this.gameData.upgradesPurchased;
  }

  addUpgradePurchased(upgrade: Upgrade) {
    this.gameData.upgradesPurchased.push(upgrade.id);
    this.upgradeService.removeFromAvailableUpgrades(upgrade);
  }

  getHoursAvailable(): number {
    return this.gameData.hoursAvailable - this.gameData.hoursWorkedPerSideHustle.reduce((a, b) => a + b);
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
    this.gameData = loadedData ? loadedData : defaultValues.gameData;
    return this.gameData;
  }

  saveGameData(gameData: GameData) {
    localStorage.setItem('IncrementalHealthGameData', JSON.stringify(gameData));
  }

  resetGameData() {
    this.gameData = defaultValues.gameData;
  }
}
