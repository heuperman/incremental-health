import { Component, OnInit } from '@angular/core';
import {Factory} from '../factory';
import {FactoryService} from '../factory.service';
import {GameDataService} from '../game-data.service';
import {UpgradeService} from '../upgrade.service';

@Component({
  selector: 'app-factories-list',
  templateUrl: './factories-list.component.html',
  styleUrls: ['./factories-list.component.css']
})
export class FactoriesListComponent implements OnInit {
  factories: Factory[];

  constructor(
    public factoryService: FactoryService,
    public upgradeService: UpgradeService,
    public gameDataService: GameDataService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
  }

  stageUnlocked(factory: Factory): boolean {
    const previousStage = this.factoryService.getPreviousStage(factory);
    return previousStage ? this.gameDataService.getAmountPurchased(previousStage) >= 10 : true;
  }

}
