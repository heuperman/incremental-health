import { Component, Input, OnInit } from '@angular/core';
import { SideHustle } from '../interfaces/side-hustle';
import { SideHustleService } from '../services/side-hustle.service';
import { GameDataService } from '../services/game-data.service';
import { Upgrade } from '../interfaces/upgrade';
import { Multipliers } from '../interfaces/multipliers';
import { UpgradeService } from '../services/upgrade.service';

@Component({
  selector: 'app-side-hustles-list',
  templateUrl: './side-hustles-list.component.html',
  styleUrls: ['./side-hustles-list.component.css']
})
export class SideHustlesListComponent implements OnInit {
  public sideHustles: SideHustle[];

  @Input() burnout: boolean;

  constructor(
    public sideHustleService: SideHustleService,
    public upgradeService: UpgradeService,
    public gameDataService: GameDataService
  ) {}

  ngOnInit() {
    this.sideHustles = this.sideHustleService.getSideHustles();
  }

  isFirstStageUnlocked(): boolean {
    return this.gameDataService.getStagesUnlocked().length > 0;
  }

  isBurnout(): boolean {
    return this.burnout;
  }

  stageUnlocked(sideHustle: SideHustle): boolean {
    if (this.gameDataService.getStressReduction() >= sideHustle.requiredStressReduction) {
      this.gameDataService.saveUnlock(sideHustle.title);
    }
    return this.gameDataService.isUnlocked(sideHustle.title);
  }

  getHoursWorked(sideHustle: SideHustle): number {
    return this.gameDataService.getHoursWorked(sideHustle);
  }

  changeHours(sideHustle: SideHustle, amount: number) {
    const index = this.sideHustleService.getSideHustleIndex(sideHustle);
    this.gameDataService.updateHoursWorked(index, amount);
  }

  getHoursAvailable(): number {
    return this.gameDataService.getHoursAvailable();
  }

  isIncreaseDisabled(): boolean {
    return this.gameDataService.getHoursAvailable() < 1 || this.burnout;
  }

  isDecreaseDisabled(sideHustle: SideHustle): boolean {
    return this.gameDataService.getHoursWorked(sideHustle) < 1;
  }

  getMultiplier(sideHustle: SideHustle): number {
    const sideHustleIndex = this.sideHustleService.getSideHustleIndex(sideHustle);
    const upgradesToApply: Upgrade[] = [];
    for (const upgradeId of this.gameDataService.getUpgradesPurchased()) {
      upgradesToApply.push(this.upgradeService.getUpgrades().find(upgrade => upgrade.id === upgradeId));
    }
    const upgrades = upgradesToApply ? upgradesToApply.filter(upgrade => upgrade.target === sideHustleIndex) : [];
    return Multipliers.base * (upgrades.length * 2) || Multipliers.base;
  }
}
