import { Component, OnInit } from '@angular/core';
import {Factory} from '../factory';
import {FactoryService} from '../factory.service';
import {GameDataService} from '../game-data.service';

@Component({
  selector: 'app-factories-list',
  templateUrl: './factories-list.component.html',
  styleUrls: ['./factories-list.component.css']
})
export class FactoriesListComponent implements OnInit {
  factories: Factory[];

  constructor(
    public factoryService: FactoryService,
    public gameDataService: GameDataService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
  }

  stageUnlocked(factory: Factory): boolean {
    const previousStage = this.factoryService.getPreviousStage(factory);
    return previousStage ? this.gameDataService.getAmountPurchased(previousStage) >= 10 : true;
  }

  getPrice(factory: Factory): number {
    return this.gameDataService.getAmountPurchased(factory) * 1.3 * factory.basePrice || factory.basePrice;
  }

  buyFactory(factory: Factory, amount: number) {
    this.gameDataService.subtractFromScore(this.getPrice(factory) * amount);
    this.gameDataService.addAmountPurchased(factory, amount);
  }
}
