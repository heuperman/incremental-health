import { Component, OnInit } from '@angular/core';
import { Factory } from '../interfaces/factory';
import { FactoryService } from '../services/factory.service';
import { GameDataService } from '../services/game-data.service';

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
    if (this.gameDataService.getStressReduction() > factory.requiredStressReduction) {
      this.gameDataService.saveUnlock(factory.title);
    }
    return this.factoryService.getFactoryIndex(factory) === 0
      || this.gameDataService.previouslyUnlocked(factory.title)
      || this.gameDataService.getStressReduction() > factory.requiredStressReduction;
  }

  changeHours(factory: Factory, amount: number) {
    const index = this.factoryService.getFactoryIndex(factory);
    this.gameDataService.updateHoursWorked(index, amount);
  }

  increaseDisabled(): boolean {
    return this.gameDataService.getHoursAvailable() < 1;
  }

  decreaseDisabled(factory: Factory): boolean {
    return this.gameDataService.getHoursWorked(factory) < 1;
  }
}
