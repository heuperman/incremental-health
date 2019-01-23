import { Component, OnInit } from '@angular/core';
import {UpgradeService} from '../upgrade.service';
import {Upgrade} from '../upgrade';
import {GameDataService} from '../game-data.service';

@Component({
  selector: 'app-upgrades-list',
  templateUrl: './upgrades-list.component.html',
  styleUrls: ['./upgrades-list.component.css']
})
export class UpgradesListComponent implements OnInit {
  upgrades: Upgrade[];

  constructor(public gameDataService: GameDataService, public upgradeService: UpgradeService) {}

  ngOnInit() {
    this.upgrades = this.upgradeService.getAvailableUpgrades();
    console.log(this.upgrades);
  }

}
