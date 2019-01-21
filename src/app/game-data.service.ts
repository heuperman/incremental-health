import { Injectable } from '@angular/core';
import {Factory} from './factory';
import {FactoryService} from './factory.service';
import {GameData} from './game-data';
import {CountService} from './count.service';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  gameData: GameData = {
    score: 0,
    factoriesPurchased: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  constructor(private factoryService: FactoryService, private scoreService: CountService) { }

  getAmountPurchased(factory: Factory): number {
    const index = this.factoryService.getFactories().indexOf(factory);
    return this.gameData.factoriesPurchased[index] || 0;
  }

  getPrice(factory: Factory): number {
    const index = this.factoryService.getFactories().indexOf(factory);
    return this.gameData.factoriesPurchased[index] * 1.3 * factory.basePrice || factory.basePrice;
  }

  recordPurchase(factory: Factory, amount: number): void  {
    const index = this.factoryService.getFactories().indexOf(factory);
    this.gameData.factoriesPurchased[index] += amount;
  }

  saveData(): void {
    this.gameData.score = this.scoreService.getCount();
    localStorage.setItem('gameData', JSON.stringify(this.gameData));
  }

  loadData(): void {
    const loadedData = JSON.parse(localStorage.getItem('gameData'));
    if (loadedData) {
      this.scoreService.addToCount(loadedData.score);
      this.gameData.factoriesPurchased = loadedData.factoriesPurchased;
    }
  }
}
