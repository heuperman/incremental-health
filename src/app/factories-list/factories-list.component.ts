import { Component, Input, OnInit } from '@angular/core';
import { Factory } from '../interfaces/factory';
import { FactoryService } from '../services/factory.service';
import { GameDataService } from '../services/game-data.service';
import { Upgrade } from '../interfaces/upgrade';
import { Multipliers } from '../interfaces/multipliers';
import { UpgradeService } from '../services/upgrade.service';

@Component({
  selector: 'app-factories-list',
  templateUrl: './factories-list.component.html',
  styleUrls: ['./factories-list.component.css']
})
export class FactoriesListComponent implements OnInit {
  public factories: Factory[];
  public isFirstStageUnlocked: boolean;

  @Input() burnout: boolean;

  constructor(
    public factoryService: FactoryService,
    public upgradeService: UpgradeService,
    public gameDataService: GameDataService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
    this.isFirstStageUnlocked = this.gameDataService.getStagesUnlocked().length > 0;
  }

  stageUnlocked(factory: Factory): boolean {
    if (this.gameDataService.getStressReduction() > factory.requiredStressReduction) {
      this.gameDataService.saveUnlock(factory.title);
    }
    return this.gameDataService.isUnlocked(factory.title);
  }

  getHoursWorked(factory: Factory): number {
    return this.gameDataService.getHoursWorked(factory);
  }

  changeHours(factory: Factory, amount: number) {
    const index = this.factoryService.getFactoryIndex(factory);
    this.gameDataService.updateHoursWorked(index, amount);
  }

  getHoursAvailable(): number {
    return this.gameDataService.getHoursAvailable();
  }

  isIncreaseDisabled(): boolean {
    return this.gameDataService.getHoursAvailable() < 1 || this.burnout;
  }

  isDecreaseDisabled(factory: Factory): boolean {
    return this.gameDataService.getHoursWorked(factory) < 1;
  }

  getMultiplier(factory: Factory): number {
    const factoryIndex = this.factoryService.getFactoryIndex(factory);
    const upgradesToApply: Upgrade[] = [];
    for (const upgradeId of this.gameDataService.getUpgradesPurchased()) {
      upgradesToApply.push(this.upgradeService.getUpgrades().find(upgrade => upgrade.id === upgradeId));
    }
    const upgrades = upgradesToApply ? upgradesToApply.filter(upgrade => upgrade.target === factoryIndex) : [];
    return Multipliers.base * (upgrades.length * 2) || Multipliers.base;
  }
}
