import {Component, HostListener, OnInit} from '@angular/core';
import {GameDataService} from './services/game-data.service';
import {GameData} from './interfaces/game-data';
import {FactoryService} from './services/factory.service';
import {Upgrade} from './interfaces/upgrade';
import {Multipliers} from './interfaces/multipliers';
import {UpgradeService} from './services/upgrade.service';
import {VictoryDialogComponent} from './victory-dialog/victory-dialog.component';
import {MatDialog} from '@angular/material';
import {defaultValues} from './defaultValues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private gameData: GameData;
  public score: number;

  constructor(
    private gameDataService: GameDataService,
    private factoryService: FactoryService,
    private upgradeService: UpgradeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.gameData = this.gameDataService.getGameData();
    this.startProduction();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.gameDataService.saveGameData(this.gameData);
  }

  startProduction() {
    setInterval(() => {
      this.gameData.score += this.calculateProduction() / 10;
      this.gameData.stressReduction -= this.calculateStressIncrease() / 10;
      this.checkAvailability();
      this.isVictoryAchieved();
    }, 100);
  }

  isBurnout(): boolean {
    const burnout =  this.gameData.stressReduction < 0;
    if (burnout) { this.resetHoursWorked(); }
    return burnout;
  }

  calculateProduction(): number {
    let production = 0;
    for (const factory of this.factoryService.getFactories()) {
      const index = this.factoryService.getFactoryIndex(factory);
      production += factory.baseProduction
        * this.getMultiplier(index)
        * this.gameData.hoursWorkedPerFactory[index];
    }
    return production;
  }

  getMultiplier(factoryIndex: number): number {
    const upgradesToApply: Upgrade[] = [];
    for (const upgradeId of this.gameData.upgradesPurchased) {
      upgradesToApply.push(this.upgradeService.getUpgrades().find(upgrade => upgrade.id === upgradeId));
    }
    const upgrades = upgradesToApply ? upgradesToApply.filter(upgrade => upgrade.target === factoryIndex) : [];
    return Multipliers.base * (upgrades.length * 2) || Multipliers.base;
  }

  calculateStressIncrease() {
    let stressIncrease = 0;
    const factories = this.factoryService.getFactories();
    factories.forEach((factory, index) => {
      stressIncrease += factory.baseProduction * this.gameData.hoursWorkedPerFactory[index];
    });
    return stressIncrease;
  }

  checkAvailability() {
    for (const upgrade of this.upgradeService.getUpgrades()) {
      if (!this.gameData.upgradesPurchased.includes(upgrade.id)
        && this.gameData.score >= upgrade.requiredFunds
        && !this.upgradeService.getAvailableUpgrades().includes(upgrade)) {
        this.upgradeService.addToAvailableUpgrades(upgrade);
      }
    }
  }

  resetHoursWorked() {
    const factories = this.factoryService.getFactories();
    factories.forEach((factory, index) => {
      this.gameData.hoursWorkedPerFactory[index] = 0;
    });
  }

  isVictoryAchieved() {
    if (this.gameData.stressReduction >= defaultValues.baseStress && !this.gameData.victoryAchieved) {
      this.gameData.victoryAchieved = true;
      this.showVictoryDialog();
    }
  }

  showVictoryDialog() {
    const dialogRef = this.dialog.open(VictoryDialogComponent, {
      height: 'auto',
      width: 'auto',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(reset => {
      if (reset) { this.gameDataService.resetGameData(); }
    });
  }
}
