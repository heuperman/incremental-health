import { Component, OnInit } from '@angular/core';
import { Factory } from '../factory';
import { FactoryService } from '../factory.service';
import { GameDataService } from '../game-data.service';
import { Multipliers } from '../multipliers';

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
    if (previousStage) {
      return this.gameDataService.getDestress() > factory.requiredDestress;
    } else {
      return true;
    }
  }

  getPrice(factory: Factory): number {
    return this.gameDataService.getAmountPurchased(factory) * Multipliers.price * factory.basePrice || factory.basePrice;
  }

  changeHours(factory: Factory, amount: number) {
    const index = this.factoryService.getFactories().indexOf(factory);
    this.gameDataService.updateHours(index, amount);
  }

  increaseDisabled(): boolean {
    return this.gameDataService.getHoursAvailable() < 1;
  }

  decreaseDisabled(factory: Factory): boolean {
    return this.gameDataService.getAmountPurchased(factory) < 1;
  }
}
