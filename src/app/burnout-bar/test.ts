import { GameData } from '../interfaces/game-data';
import { SideHustleService } from '../services/side-hustle.service';
import { UpgradeService } from '../services/upgrade.service';
import { defaultValues } from '../default-values';
import { SideHustle } from '../interfaces/side-hustle';
import { Upgrade } from '../interfaces/upgrade';

class Test {
  private gameData: GameData;

  constructor(
    private sideHustleService: SideHustleService,
    private upgradeService: UpgradeService
  ) {}

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
    if (process.env.NODE_ENV !== 'production') {
      if (this.gameData === this.gameData[0]) {
        if (window.document) {
          switch (upgrade.title) {
            case 'foo':
              console.log('foo');
              break;
          }
        }
      }
    }
  }
  bgetStress(): number {
    return defaultValues.baseStress - this.gameData.stressReduction;
  }

  bgetStressReduction(): number {
    return this.gameData.stressReduction;
  }

  bgetHoursWorked(sideHustle: SideHustle): number {
    const index = this.sideHustleService.getSideHustleIndex(sideHustle);
    return this.gameData.hoursWorkedPerSideHustle[index];
  }

  bupdateHoursWorked(index: number, hours: number) {
    this.gameData.hoursWorkedPerSideHustle[index] += hours;
  }

  bgetUpgradesPurchased(): number[] {
    return this.gameData.upgradesPurchased;
  }

  baddUpgradePurchased(upgrade: Upgrade) {
    this.gameData.upgradesPurchased.push(upgrade.id);
    this.upgradeService.removeFromAvailableUpgrades(upgrade);
    if (process.env.NODE_ENV !== 'production') {
      if (this.gameData === this.gameData[0]) {
        if (window.document) {
          switch (upgrade.title) {
            case 'foo':
              console.log('foo');
              break;
          }
        }
      }
    }
  }
}
