import { Component, OnInit } from '@angular/core';
import { UpgradeService } from '../services/upgrade.service';
import { Upgrade } from '../interfaces/upgrade';
import { GameDataService } from '../services/game-data.service';

@Component({
  selector: 'app-upgrades-list',
  templateUrl: './upgrades-list.component.html'
})
export class UpgradesListComponent implements OnInit {
  upgrades: Upgrade[];

  constructor(public gameDataService: GameDataService, public upgradeService: UpgradeService) { }

  ngOnInit() {
    this.upgrades = this.upgradeService.getAvailableUpgrades();
  }

  buyUpgrade(upgrade: Upgrade) {
    this.gameDataService.subtractFromScore(upgrade.price);
    this.gameDataService.addUpgradePurchased(upgrade);
  }

}
